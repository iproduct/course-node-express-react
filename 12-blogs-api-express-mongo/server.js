const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts-router');
const usersRouter = require('./routes/users-router');
const authRouter = require('./routes/auth-router');
const sendErrorResponse = require('./routes/utils').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';

const app = express();
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:3000', // create-react-app dev server
}

app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}));
app.use(express.static('public'))
app
    .use('/api/posts', postsRouter)
    .use('/api/users', usersRouter)
    .use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('Hello Express and NodeJS World!'))
app.post('/hello/:name', function (req, res) {
    res.type('html').send(`<h1>Hi ${req.params.name}</h1>`);
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
})

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    app.locals.db = con.db(db_name);
    console.log(`Connection extablished to ${db_name}.`);
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
});

