const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const replaceId = require('./utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const verifyToken = require('./verify-token');
const verifyRole = require('./verify-role');

const router = express.Router();

// Posts API Feature
router.get('/', async(req, res) => {
    try{
        const posts = await req.app.locals.db.collection('posts').find().toArray();
        res.json(posts.map(p => replaceId(p)));
    } catch(err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});
router.get('/:id', async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const post = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
        if (!post) {
            sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
            return;
        }
        res.json(post);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.post('/', function(req, res) {
    const post = req.body;
    indicative.validator.validate(post, {
        // id: 'required|regex:^[0-9a-f]{24}',
        title: 'required|string|min:3|max:60',
        subtitle: 'string|max:120',
        content: 'string',
        imageUrl: 'url'
    }).then(() => {
        req.app.locals.db.collection('posts').insertOne(post).then(r => {
            if (r.result.ok && r.insertedCount === 1) {
                delete post._id;
                post.id = r.insertedId;
                console.log(`Created post: ${post.id}: ${post.title}`);
                res.status(201).location(`/posts/${post.id}`).json(post);
            } else {
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        }).catch(err => {
            console.error(`Unable to create post: ${post.id}: ${post.title}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        });
    }).catch(errors => {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    });
});

router.put('/:id', verifyToken, verifyRole(['Admin']), async (req, res) => {
    const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
    if (!old) {
        sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
        return;
    }
    const post = req.body;
    if (old._id.toString() !== post.id) {
        sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${req.params.id}`);
        return;
    }
    try {
        await indicative.validator.validate(post, {
            id: 'required|regex:^[0-9a-f]{24}',
            title: 'required|string|min:3|max:60',
            subtitle: 'string|max:120',
            content: 'string',
            imageUrl: 'url'
        });
        try {
            r = await req.app.locals.db.collection('posts').updateOne({ _id: new ObjectID(req.params.id) }, { $set: post });
            if (r.result.ok) {
                delete post._id;
                console.log(`Updated post: ${JSON.stringify(post)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new posts are the same.`);
                }
                res.json(post);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update post: ${post.id}: ${post.title}`);
            }
        } catch (err) {
            console.log(`Unable to update post: ${post.id}: ${post.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
        if (!old) {
            sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('posts').deleteOne({ _id: new ObjectID(req.params.id) });
        if(r.result.ok && r.deletedCount === 1) {
            console.log(`Deleted post: ${old.id}: ${old.title}`);
            res.json(old);
        } else {
            console.log(`Unable to delete post: ${post.id}: ${post.title}`);
            sendErrorResponse(req, res, 500, `Unable to delete post: ${old.id}: ${old.title}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;