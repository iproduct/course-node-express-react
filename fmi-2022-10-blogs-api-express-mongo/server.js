const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const postsRouter = require('./routes/posts-router');
const usersRouter = require('./routes/users-router');
const authRouter = require('./routes/auth-router');
const sendErrorResponse = require('./routes/utils').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const db_name = 'blogs2022';

const app = express();
const port = 9000;


const corsOpts = {
    origin: 'http://localhost:3000'
}

if(!process.env.BLOGS_API_SECRET) {
    console.log("Error: BLOGS_API_SECRET environment variable should be set");
}

// apply express middleware
app.use(cors(corsOpts))
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }))

app.use(express.static('public'))
app
    .use('/api/posts', postsRouter)
    .use('/api/users', usersRouter)
    .use('/api/auth', authRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, err.status || 500, `Server error: ${err.message}`, err);
})

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    app.locals.db = con.db(db_name);
    console.log(`Connection extablished to ${db_name}.`);
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
});

