import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { Request, Response, ErrorRequestHandler } from 'express';
import { AppError, sendErrorResponse } from './utils';
import { nextTick } from 'process';

const HOSTNAME = 'localhost';
const PORT = 8001;

const todos = [
    { id: 1, text: 'Implement REST Server' },
    { id: 2, text: 'Implement GET All Todos' },
    { id: 3, text: 'Implement POST New Todo' },
    { id: 4, text: 'Implement error handling' }
];

console.log(process.env.NODE_ENV)

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

app.get('/', (req, res) => {
    res.send(`<h1>Hello from ExpressJS on port ${PORT}!</h1>`);
}).get('/api/todos', (req, res) => {
    res.json(todos);
}).get('/api/todos/:todoId', (req, res, next) => {
    const todoId = +req.params.todoId;
    const todo = todos.find(td => td.id === todoId);
    if(todo) {
        res.json(todo);
    } else {
        next({status: 404, message: `Todo with ID=${todoId} not found`});
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