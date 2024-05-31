import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { Request, Response, ErrorRequestHandler } from 'express';
import { AppError, sendErrorResponse } from './utils';
import { nextTick } from 'process';
import { JsonFileRepository } from './dao/posts-repository';
import { Post } from './model/post';
import { Repository } from './dao/repository';

const HOSTNAME = 'localhost';
const PORT = 8001;

const app = express();
app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST'
}));
app.use(logger('dev'));
app.use('/api', (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
    });
    next();
});

app.set('postsRepo', new JsonFileRepository<Post>('db.json'));

app.get('/', (req, res) => {
    res.send(`<h1>Hello from ExpressJS on port ${PORT}!</h1>`);
}).get('/api/posts', async (req, res) => {
    const repo = req.app.get('postsRepo') as Repository<Post>;
    res.json(await repo.findAll());
}).get('/api/posts/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    const repo = req.app.get('postsRepo') as Repository<Post>;
    try {
        const post = await repo.findById(postId);
        res.json(post);
    } catch (err) {
        next({status: 404, message: err.message});
    }
});

app.use(function(err: any, req: Request, res:Response, next) {
    err = err as AppError;
    console.log(err);
    sendErrorResponse(req, res, err.status, err.message, err);
});

app.on('error', err => {
    console.log('Server error:', err);
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP server started on: http://${HOSTNAME}:${PORT}`);
});