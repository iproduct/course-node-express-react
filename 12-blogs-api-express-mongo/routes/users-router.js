const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const replaceId = require('./utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();

// Users API Feature
router.get('/', async (req, res) => {
    try {
        const users = await req.app.locals.db.collection('users').find().toArray();
        res.json(users.map(p => replaceId(p)));
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});
router.get('/:id', async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const user = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params.id) });
        if (!user) {
            sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
            return;
        }
        res.json(user);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.post('/', async (req, res) => {
    const user = req.body;
    try {
        await indicative.validator.validate(user, {
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|email',
            password: 'required|string|min:6',
            role: 'in:Author,Admin',
            imageUrl: 'url'
        });
        if(!user.role) {
            user.role = 'Author';
        }
        try {
            const r = await req.app.locals.db.collection('users').insertOne(user);
            if (r.result.ok && r.insertedCount === 1) {
                delete user._id;
                user.id = r.insertedId;
                console.log(`Unable to update post: ${user.id}: ${user.firstName} ${user.lastName}`);
                res.status(201).location(`/users/${user.id}`).json(user);
            } else {
                sendErrorResponse(req, res, 500, `Unable to create user: ${user.id}: ${user.firstName} ${user.lastName}`);
            }
        } catch (err) {
            console.log(`Unable to create user: ${user.id}: ${user.firstName} ${user.lastName}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create user: ${user.id}: ${user.firstName} ${user.lastName}`, err);
        }
    } catch(errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:id', async (req, res) => {
    const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params.id) });
    if (!old) {
        sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
        return;
    }
    const user = req.body;
    if (old._id.toString() !== user.id) {
        sendErrorResponse(req, res, 400, `User ID=${user.id} does not match URL ID=${req.params.id}`);
        return;
    }
    try {
        await indicative.validator.validate(user, {
            id: 'required|regex:^[0-9a-f]{24}$',
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|email',
            password: 'required|string|min:6',
            role: 'required|in:Author,Admin',
            imageUrl: 'url'
        });
        try {
            r = await req.app.locals.db.collection('users').updateOne({ _id: new ObjectID(req.params.id) }, { $set: user });
            if (r.result.ok) {
                delete user._id;
                console.log(`Updated user: ${JSON.stringify(user)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new users are the same.`);
                }
                res.json(user);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update user: ${user.id}: ${user.firstName} ${user.lastName}`);
            }
        } catch (err) {
            console.log(`Unable to update user: ${user.id}: ${user.firstName} ${user.lastName}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to update user: ${user.id}: ${user.firstName} ${user.lastName}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params.id) });
        if (!old) {
            sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('users').deleteOne({ _id: new ObjectID(req.params.id) });
        if (r.result.ok && r.deletedCount === 1) {
            res.json(old);
        } else {
            console.log(`Unable to delete user: ${old.id}: ${old.firstName} ${old.lastName}`);
            sendErrorResponse(req, res, 500, `Unable to delete user: ${old.id}: ${old.firstName} ${old.lastName}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;