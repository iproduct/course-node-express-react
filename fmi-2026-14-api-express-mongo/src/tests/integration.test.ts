import dotenv from 'dotenv';
import { createApp } from '../presentation/app';
import { connectDatabase, disconnectDatabase } from '../infrastructure/db/connection';
import mongoose from 'mongoose';
import { logger } from '../infrastructure/logging/logger';

dotenv.config();

const port = 4001;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blogs-db';

async function runTests() {
  logger.info('--- RUNNING INTEGRATION TESTS ---');

  await connectDatabase(mongoUri);

  if (mongoose.connection.db) {
    try {
      await mongoose.connection.db.dropDatabase();
      logger.info('Test database cleaned.');
    } catch (e) {
      logger.warn('Could not drop database, continuing...', e);
    }
  }

  const app = createApp();
  const server = app.listen(port);
  logger.info(`Test server listening on port ${port}`);

  const baseUrl = `http://localhost:${port}/api`;

  try {
    // 1. AJV Validation Test
    logger.info('Testing AJV Validation (register with invalid email)...');
    const invalidRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'bob',
        email: 'invalid-email',
        passwordHash: '123456',
        firstName: 'Bob',
        lastName: 'Smith',
        role: 'reader',
      }),
    });
    const invalidRegData = (await invalidRegRes.json()) as any;
    if (invalidRegRes.status !== 400 || !invalidRegData.error) {
      throw new Error('Validation failed: expected 400 Bad Request');
    }
    logger.info('AJV validation works perfectly! Got 400 with detail: ' + JSON.stringify(invalidRegData.details));

    // 2. Register users
    logger.info('Registering Reader, Author, and Admin...');
    const registerUser = async (username: string, role: string) => {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email: `${username}@test.com`,
          passwordHash: 'password123',
          firstName: username.charAt(0).toUpperCase() + username.slice(1),
          lastName: 'Tester',
          role,
        }),
      });
      if (res.status !== 201) {
        throw new Error(`Failed to register ${role}: ${res.statusText}`);
      }
      return res.json() as Promise<any>;
    };

    const reader = await registerUser('reader1', 'reader');
    const author1 = await registerUser('author1', 'author');
    const author2 = await registerUser('author2', 'author');
    const admin = await registerUser('admin1', 'admin');

    logger.info('All users registered successfully.');

    // 3. Login users
    const loginUser = async (username: string) => {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail: username,
          passwordHash: 'password123',
        }),
      });
      const data = (await res.json()) as any;
      return data.token;
    };

    const readerToken = await loginUser('reader1');
    const author1Token = await loginUser('author1');
    const author2Token = await loginUser('author2');
    const adminToken = await loginUser('admin1');

    logger.info('Tokens retrieved successfully.');

    // 4. Role Guard Validation
    logger.info('Testing Role Guard: Reader trying to create a blog...');
    const readerCreateRes = await fetch(`${baseUrl}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${readerToken}`,
      },
      body: JSON.stringify({
        title: 'Reader Post',
        content: 'Readers should not write posts.',
        category: 'Tech',
        published: true,
      }),
    });
    if (readerCreateRes.status !== 403) {
      throw new Error('Role Guard failed: Reader was allowed to post or got incorrect code');
    }
    logger.info('Role guard works! Got 403 Forbidden.');

    // 5. Author 1 creates a blog (Published)
    logger.info('Author 1 creating a published blog...');
    const blog1Res = await fetch(`${baseUrl}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${author1Token}`,
      },
      body: JSON.stringify({
        title: 'Node.js Clean Architecture with DDD',
        content: 'This blog post explains Domain Driven Design in Node.js applications.',
        category: 'Engineering',
        published: true,
        keywords: ['node', 'ddd', 'architecture'],
      }),
    });
    const blog1 = (await blog1Res.json()) as any;
    if (blog1Res.status !== 201) {
      throw new Error('Author 1 failed to create blog');
    }
    logger.info(`Blog 1 created: "${blog1.title}" (ID: ${blog1.id})`);

    // 6. Author 1 creates a draft blog
    logger.info('Author 1 creating a draft blog...');
    const blog2Res = await fetch(`${baseUrl}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${author1Token}`,
      },
      body: JSON.stringify({
        title: 'Draft - Secrets of ExpressJS',
        content: 'Draft content of express.',
        category: 'NodeJS',
        published: false,
      }),
    });
    const blog2 = (await blog2Res.json()) as any;
    logger.info(`Draft Blog 2 created: "${blog2.title}" (ID: ${blog2.id})`);

    // 7. Security: Author 2 tries to update Author 1's blog
    logger.info("Testing Ownership Guard: Author 2 trying to update Author 1's blog...");
    const badUpdateRes = await fetch(`${baseUrl}/blogs/${blog1.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${author2Token}`,
      },
      body: JSON.stringify({
        title: 'Hacked title',
      }),
    });
    if (badUpdateRes.status !== 400) {
      throw new Error('Ownership Guard failed: Author 2 updated Author 1\'s blog');
    }
    logger.info('Ownership guard works! Got 400 Bad Request / permission error.');

    // 8. Author 1 updates their own blog
    logger.info('Author 1 updating their own blog title...');
    const goodUpdateRes = await fetch(`${baseUrl}/blogs/${blog1.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${author1Token}`,
      },
      body: JSON.stringify({
        title: 'Node.js DDD Clean Architecture',
      }),
    });
    const updatedBlog = (await goodUpdateRes.json()) as any;
    if (goodUpdateRes.status !== 200 || updatedBlog.title !== 'Node.js DDD Clean Architecture') {
      throw new Error('Update failed');
    }
    logger.info('Update success!');

    // 9. Query & Filter tests
    logger.info('Testing query filter: query with q="Clean Architecture"...');
    const filterQRes = await fetch(`${baseUrl}/blogs?q=clean%20architecture`);
    const filterQBlogs = (await filterQRes.json()) as any[];
    if (filterQBlogs.length !== 1 || filterQBlogs[0].id !== blog1.id) {
      throw new Error('Text search filter failed');
    }
    logger.info('Text search filter works!');

    logger.info('Testing query filter: query with userId of author1...');
    const filterAuthorRes = await fetch(`${baseUrl}/blogs?userId=${author1.id}`);
    const filterAuthorBlogs = (await filterAuthorRes.json()) as any[];
    if (filterAuthorBlogs.length !== 1 || filterAuthorBlogs[0].id !== blog1.id) {
      throw new Error('Author query filter failed or returned drafts to guest');
    }
    logger.info('Author filter query works (guest cannot see drafts).');

    logger.info('Testing query filter: admin querying author1 including drafts...');
    const adminFilterRes = await fetch(`${baseUrl}/blogs?userId=${author1.id}&published=false`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    const adminFilterBlogs = (await adminFilterRes.json()) as any[];
    if (adminFilterBlogs.length !== 1 || adminFilterBlogs[0].id !== blog2.id) {
      throw new Error('Admin draft query filter failed');
    }
    logger.info('Admin querying drafts filter works!');

    // 10. Delete blog
    logger.info('Admin deleting draft blog...');
    const deleteRes = await fetch(`${baseUrl}/blogs/${blog2.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    if (deleteRes.status !== 204) {
      throw new Error('Delete failed');
    }
    logger.info('Delete works! Check that it is deleted...');
    const checkDeletedRes = await fetch(`${baseUrl}/blogs/${blog2.id}`);
    if (checkDeletedRes.status !== 404) {
      throw new Error('Draft blog was not deleted');
    }
    logger.info('Assert blog deleted works.');

    logger.info('--- ALL TESTS COMPLETED SUCCESSFULLY ---');
  } catch (error) {
    logger.error('Test suite failed:', error);
    process.exit(1);
  } finally {
    server.close();
    await disconnectDatabase();
    process.exit(0);
  }
}

runTests();
