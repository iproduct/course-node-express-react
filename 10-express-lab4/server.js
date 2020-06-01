const express = require('express')
// const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts-router');
const usersRouter = require('./routes/users-router');
const sendErrorResponse = require('./routes/utils').sendErrorResponse;

const app = express();
const port = 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.static('public'))
app
    .use('/api/posts', postsRouter)
    .use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('Hello Express and NodeJS World!'))
app.post('/hello/:name', function (req, res) {
    res.type('html').send(`<h1>Hi ${req.params.name}</h1>`);
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))