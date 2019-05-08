/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * This file is licensed under terms of Apache License v2.0
 * The full text of Apache v2 license is providded in file named LICENSE,
 * residing in the root folder of this project, and is available online at 
 * https://www.apache.org/licenses/LICENSE-2.0
 */

 exports.error = function(req, res, statusCode, message, err) {
    console.log(req.app.get('env'));
    if(req.app.get('env') === 'development') {
        res
            .status(statusCode || 500)
            .json({
                message: message || err.message,
                error: err || {}
            });
    } else {
        res
        .status(statusCode || 500)
        .json({
            message: message || err.message,
            error: {}
        });
    }
}

exports.replaceId = function(entity) {
    if(entity) {
        entity.id = entity._id;
        delete (entity._id);
    }
    return entity;
}