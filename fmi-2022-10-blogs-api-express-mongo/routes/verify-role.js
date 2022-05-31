/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

const mongodb = require('mongodb');
const replace_id = require('./utils').replace_id;

module.exports = function verifyRoleOrSelf(roles) {
  return function (req, res, next) {
    const paramUserId = req.params.userId;
    const userId = req.userId;
    const db = req.app.locals.db;
    if (!userId) next({ status: 403, message: `No userId provided.` }); //Error
    else {
      db.collection('users').findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
        if (error) next({ status: 500, message: `Server error.`, error }); //Error
        else if (!user) next({ status: 401, message: `Invalid token.` }); //Error
        else {
            if ( roles.findIndex(r => r === user.role) < 0 ) 
                next({ status: 403, message: `Not enough privilegies for this operation.` }); //Error
            else {
                delete user.password;
                replace_id(user);
                // if everything good, save user to request for use in other routes
                req.user = user;
                next();
            }
        }
      });
    }
  }
}

