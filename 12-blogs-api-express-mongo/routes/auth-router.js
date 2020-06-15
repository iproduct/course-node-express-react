const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const replaceId = require('./utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret').secret;

const router = express.Router();

// Users API Feature
router.post('/login', async (req, res) => {
    const db = req.app.locals.db;
    const credentials = req.body;
    try {
        await indicative.validator.validate(credentials, {
            username: 'required|email',
            password: 'required|string|min:6'
        });
        try {
            const user = await db.collection('users').findOne({ username: credentials.username });
            if (!user) {
                sendErrorResponse(req, res, 404, `User with Username=${credentials.username} does not exist.`);
                return;
            }
            const passIsValid = bcrypt.compareSync(credentials.password, user.password);
            if(!passIsValid) {
                sendErrorResponse(req, res, 401, `Username or password is incorrect.`);
                return;
            }
            replaceId(user);
            const token = jwt.sign({id: user.id}, secret, {
                expiresIn: 86400 //expires in 24 h
            });
            delete user.password;
            res.status(200).json({auth: true, token, user});
        } catch (err) {
            console.log(`Unable to create user: ${user.id}: ${user.firstName} ${user.lastName}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create user: ${user.id}: ${user.firstName} ${user.lastName}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }



});

router.post('/register', async (req, res) => {
    const user = req.body;
    try {
        await indicative.validator.validate(user, {
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|email',
            password: 'required|string|min:6',
            imageUrl: 'url'
        });
        user.role = 'Author';
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
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
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;