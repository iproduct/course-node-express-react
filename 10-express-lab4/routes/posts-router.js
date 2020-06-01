const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const replaceId = require('./utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const util = require('util');

const router = express.Router();

// Posts API Feature
router.get('/', (req, res) => {
    req.app.locals.db.collection('posts').find().toArray().then(posts => {
        res.json(posts.map(p => replaceId(p)));
    });
});
router.get('/:id', (req, res) => {
    const post = req.app.locals.db.collection('posts').findOne(new ObjectID(req.params.id)).then(post => {
        if (!post) {
            sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
        }
        res.json(post);
    });
});

router.post('/', function (req, res) {
    const post = req.body;
    indicative.validator.validate(post, {
        // id: 'required|regex:^[0-9a-f]{24}',
        title: 'required|string|min:2|max:60',
        subtitle: 'string|max:255',
        description: 'string',
    }).then(() => {
        req.app.locals.db.collection('posts').insertOne(post).then(r => {
            if (r.result.ok && r.insertedCount === 1) {
                delete  post._id;
                post.id = r.insertedId;
                console.log(`Created post: ${post}`);
                res.status(201).location(`/posts/${post.id}`).json(post);
            } else {
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        }).catch(err => {
            console.log("Error: Update unsuccessfull.");
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        });
    }).catch(errors => {
        sendErrorResponse(req, res, 400, `Invalid user data: ${util.inspect(errors)}`);
    });
});

router.put('/:id', (req, res) => {
    const old = posts.get(+req.params.id);
    if (!old) {
        sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
    }
    const post = req.body;
    if (old.id !== post.id) {
        sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${+req.params.id}`);
    }

    posts.set(post.id, post);
    console.log(`Updated post: ${post}`);
    res.json(post);
});

router.delete('/:id', (req, res) => {
    const old = posts.get(+req.params.id);
    if (!old) {
        sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
    }

    posts.delete(+req.params.id);
    console.log(`Deleted post: ${old}`);
    res.json(old);
});

module.exports = router;