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
import postsRouter from './routes/posts-router'

export const HOSTNAME = 'localhost';
export const PORT = 8001;

const app = express();
app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST'
}));
app.use(express.json({limit: '10mb'}));
app.use(logger('dev'));
app.use('/api', (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
    });
    next();
});

app.set('postsRepo', new JsonFileRepository<Post>('db.json'));

app.use('/api/posts', postsRouter);

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