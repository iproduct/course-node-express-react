import { MongoClient } from 'mongodb';
import { Post } from './model/post';
import MOCK_POSTS from './model/mock-posts';

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'fmi-2025-intro';
const collection = 'posts';

(async () => {
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(dbName);

    try {
        // clean collection
        const dropRes = await db.collection(collection).drop();
        console.log(`Dropped collection ${collection}: ${dropRes}`)

        // batch insert posts
        const res = await db.collection(collection).insertMany(MOCK_POSTS);
        console.log(res);
        if(res.acknowledged) {
            console.log(`Inserted ${res.insertedCount} new documents with IDs: ${JSON.stringify(res.insertedIds)}`);
        }

        // get all posts
        const posts = await db.collection(collection).find<Post>({}).toArray();
        posts.forEach(post => console.log(post));

    } catch(err) {
        console.log(err)
    } finally {
        console.log('Finishing demo ...');
        con.close();
    }
})(); //IIFE