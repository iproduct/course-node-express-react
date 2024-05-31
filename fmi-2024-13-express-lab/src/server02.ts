import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import * as cors from 'cors';
import { Todo } from './model/todo';
import { randomUUID } from 'crypto';
import { WebError } from './model/web-error';
dotenv.config();

const todos: Todo[] = [
    { id: "1", text: 'Implement REST API' },
    { id: "2", text: 'Implement GET All Todos endpoint' },
    { id: "3", text: 'Implement POST new Todo' },
    { id: "4", text: 'Implement error handling' }
]


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',

}))
app.use(express.json({ "limit": "10mb" }));


app.get("/", (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html');
    res.send("<h1>Hello from ExpressJS!</h1>");
})

app.get('/api/todos', (req: Request, res: Response) => {
    res.json(todos);
})

app.get('/api/todos/:todoId', (req: Request, res: Response, next:NextFunction) => {
    const todo = todos.find(td => td.id === req.params.todoId);
    if (todo) {
        res.json(todo);
    } else {
       next(new WebError(404, `Todo with ID='${req.params.todoId}' not found`));
    }
})

app.post('/api/todos', (req: Request, res: Response) => {
    const todo = req.body as Todo;
    todo.id = uuid.v4();
    todos.push(todo);
    res.status(201).location(`/api/todos/${todo.id}`).json(todo);
})

app.use((err: Error, req, res, next) => {
    if(err instanceof WebError) {
        res.status(err.status).json(err);
        return;
    }
    next(err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})