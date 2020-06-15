/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifyToken(req, res, next) {
  console.log(req.headers);
  const tokenHeader = req.headers['authorization'];
  const segments = tokenHeader.split(' ');
  if (segments.length !== 2 || segments[0].trim() !== 'Bearer' || segments[1].trim().length < 80) {
    next({ status: 403, message: `No access token provided.` });
    return;
  }
  const token = segments[1].trim();
  console.log(`Token: ${token}`);

  jwt.verify(token, config.secret, function (error, decoded) {
    if (error) next({ status: 403, message: `Failed to authenticate token.`, error });
    else {
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  });
}

module.exports = verifyToken;
