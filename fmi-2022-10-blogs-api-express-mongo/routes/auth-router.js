const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const replace_id = require('./utils').replace_id;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const secret = require('../config/secret').secret;

const router = express.Router();

// Users API Feature
router.post('/login', async (req, res) => {
    const db = req.app.locals.db;
    const credentials = req.body;
    try {
        await indicative.validator.validate(credentials, {
            username: 'required|string|min:5',
            password: 'required|string|min:6'
        });
        try {
            const user = await db.collection('users').findOne({ username: credentials.username });
            if (!user) {
                sendErrorResponse(req, res, 401,  `Username or password is incorrect`);
                return;
            }
            const passIsValid = await bcrypt.compare(credentials.password, user.password);
            if(!passIsValid) {
                sendErrorResponse(req, res, 401, `Username or password is incorrect`);
                return;
            }
            replace_id(user);
            const token = jwt.sign({id: user.id}, process.env.BLOGS_API_SECRET, {
                expiresIn: 1800 //expires in 30 minutes
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
            username: 'required|string|min:5',
            email: 'required|email',
            password: 'required|string|min:6',
            role: 'required|string|in:AUTHOR,ADMIN',
            imageUrl: 'url',
            active: 'required:boolean'
        });
        user.role = 'AUTHOR';
        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(user.password, salt);
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