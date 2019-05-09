const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.MY_BLOG_SECRET;

function verifyRole(role) {
    return function(req, res, next) {
        const userId = req.userId;
        const db = req.app.locals.db;
        console.log(`UserId: ${userId}`);
        if(!userId) {
            next({status: 403, message: 'No user id provided.'});
        } else {
            db.collection('users').findOne({_id: new mongodb.ObjectID(userId)})
                .then(user => {
                    console.log(`User found: ${JSON.stringify(user)}`);
                    if(user.role < role) {
                        next({status: 403, message: 'Not enough privilegies to do this.'});
                    } else {
                        delete user.password;
                        replaceId(user);
                        req.user = user;
                        next();
                    }
                }).catch(err => next({status: 500, message: `Server error.`, err}));
        }
    }
};

module.exports = verifyRole;