const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;

const router = express.Router();
let nextId = 0;
const posts = new Map();

// Posts API Feature
router.get('/', (req, res) => res.json(Array.from(posts.values())));
router.get('/:id', (req, res) => {
    const post = posts.get(+req.params.id);
    if(!post) {
        sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
    }
    res.json(post);
});

router.post('/', function (req, res) {
    const post = req.body;
    post.id = ++nextId;
    posts.set(post.id, post);
    console.log(`Created post: ${post}`);
    res.status(201).location(`/posts/${post.id}`).json(post);
})

router.put('/:id', (req, res) => {
    const old = posts.get(+req.params.id);
    if(!old) {
        sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
    }
    const post = req.body;
    if(old.id !== post.id) {
        sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${+req.params.id}`);
    }
    
    posts.set(post.id, post);
    console.log(`Updated post: ${post}`);
    res.json(post);
});

router.delete('/:id', (req, res) => {
    const old = posts.get(+req.params.id);
    if(!old) {
        sendErrorResponse(req, res, 404, `Post with ID=${+req.params.id} does not exist`);
    }
    
    posts.delete(+req.params.id);
    console.log(`Deleted post: ${old}`);
    res.json(old);
});

module.exports = router;