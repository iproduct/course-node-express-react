import { sendErrorResponse } from './../utils';
import * as express from 'express';
import { Request, Response, Router } from 'express';
import { Repository } from '../dao/repository';
import { Post } from '../model/post';
import {validator} from 'indicative';
import { HOSTNAME, PORT } from '../04-server-express-router';

const router = Router();

// Posts API Feature
router.get('/', async (req, res) => {
    const repo = req.app.get('postsRepo') as Repository<Post>;
    res.json(await repo.findAll());
}).get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    const repo = req.app.get('postsRepo') as Repository<Post>;
    try {
        const post = await repo.findById(postId);
        res.json(post);
    } catch (err) {
        next({status: 404, message: err.message});
    }
}).post('/', async (req, res, next) => {
    const repo = req.app.get('postsRepo') as Repository<Post>;
    const post = req.body as Post;
    try {
        await validator.validate(post, {
            title: 'required|string|min:3|max:80',
            content: 'string|max:1024',
            authorId: 'required|regex:[0-9a-f\\-]{36}',
            imageUrl: 'url',
            tags: 'required|array',
            'tags.*': 'string|regex:\\w+',
            categories: 'required|array',
            'categories.*': 'string'
        });
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    const now = new Date();
    post.created = now;
    post.modified = now; 
    try {
        const created = await repo.create(post);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/posts/${created.id}`).json(created);
    } catch(err) {
        console.log(err);
        sendErrorResponse(req, res, 500, `Unable to create post '${post.title}: ${err.message}`, err);
    }
});

export default router;