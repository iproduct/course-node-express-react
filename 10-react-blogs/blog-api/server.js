/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * This file is licensed under terms of Apache License v2.0
 * The full text of Apache v2 license is providded in file named LICENSE,
 * residing in the root folder of this project, and is available online at 
 * https://www.apache.org/licenses/LICENSE-2.0
 */

 const express = require('express');
const path  = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const articlesRouter = require('./routes/article.routes');
const usersRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');

const port  = 9000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));

app.use('/api/articles', articlesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use( function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err.error || err || {}
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
}

const dburl = 'mongodb://localhost:27017/articles2';

MongoClient.connect(dburl, { useNewUrlParser: true }).then( db => {
    // if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("articles2");
    app.locals.db = dbo;
    app.listen( port, err => {
        if(err) throw err;
        console.log(`Blog API is listening on port ${port}`);
    });
}).catch(err => { 
    console.error("Error: MongoDB not available. Check that it is started on port 27017.")
    throw err;
});