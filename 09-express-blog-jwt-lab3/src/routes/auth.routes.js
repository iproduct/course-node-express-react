const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').error;
const util = require('util');
const indicative = require('indicative');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.MY_BLOG_SECRET;

router.post('/login', function(req, res) {
    const db = req.app.locals.db;
    const params = req.body;
    indicative.validate(params ,{
        username: 'required|string|min:2',
        password: 'required|string|min:6|max:20',
    }).then(() => {
        db.collection('users').findOne({username: params.username})
            .then(user => {
                console.log(`User logging: ${JSON.stringify(user)}`);
                if(!user.username) {
                    error(req, res, 404, `User ${params.username} not found.`)
                } else {
                    const passwordIsValid = bcrypt.compareSync(params.password, user.password);
                    if( !passwordIsValid ) {
                        error(req, res, 401, 'Unauthorised.');
                    } else {
                        token = jwt.sign({id: user._id}, secret, {expiresIn: 3600});
                        delete user.password;
                        replaceId(user);
                        res.status(200).json( {auth: true, token, user } );
                    }
                }
            }).catch(err => error(req, res, 500, `Server error.`, err))
    })
    .catch( err => {
        error(req, res, 400, `Invalid user data ${util.inspect(err)}`)
    });
});

module.exports = router;