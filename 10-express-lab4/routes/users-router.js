const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;

const router = express.Router();
let nextId = 0;
const users = new Map();

// users API Feature
router.get('/', (req, res) => res.json(Array.from(users.values())));
router.get('/:id', (req, res) => {
    const user = users.get(+req.params.id);
    if(!user) {
        sendErrorResponse(req, res, 404, `User with ID=${+req.params.id} does not exist`);
    }
    console.log(user);
    res.json(user);
});

router.post('/', function (req, res) {
    const user = req.body;
    user.id = ++nextId;
    users.set(user.id, user);
    console.log(`Created user: ${user}`);
    res.status(201).location(`/users/${user.id}`).json(user);
})

router.put('/:id', (req, res) => {
    const old = users.get(+req.params.id);
    if(!old) {
        sendErrorResponse(404, `User with ID=${+req.params.id} does not exist`);
    }
    const user = req.body;
    if(old.id !== user.id) {
        sendErrorResponse(400, `User ID=${user.id} does not match URL ID=${+req.params.id}`);
    }
    
    users.set(user.id, user);
    console.log(`Updated user: ${user}`);
    res.json(user);
});

router.delete('/:id', (req, res) => {
    const old = users.get(+req.params.id);
    if(!old) {
        sendErrorResponse(404, `User with ID=${+req.params.id} does not exist`);
    }
    
    users.delete(+req.params.id);
    console.log(`Deleted user: ${old}`);
    res.json(old);
});

module.exports = router;