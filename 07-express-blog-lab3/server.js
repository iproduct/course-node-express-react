const express = require('express');
const path  = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const articlesRouter = require('./routes/articles.routes');
const authorsRouter = require('./routes/authors.routes');

const port  = 9000;

const rootPath = path.normalize(__dirname);

const app = express();

app.set('app', path.join(rootPath, 'app'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));

app.use('/api/articles', articlesRouter);
app.use('/api/authors', authorsRouter);

app.use( function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err.error || err | {}
    });
});

const dburl = 'mongodb://localhost:27017/articles2';

MongoClient.connect(dburl, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("articles2");
    console.log(`DB : ${dbo}`);
    app.locals.db = dbo;
    app.listen( port, err => {
        if(err) throw err;
        console.log(`Blog API is listening on port ${port}`);
    });
});