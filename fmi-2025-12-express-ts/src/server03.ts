import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from './model/todo';
import {readFile, writeFile} from 'fs/promises';
import { JsonFileRepository } from './dao/posts-repository';
import { Repository } from './dao/repository';
import {validator} from 'indicative';
import { sendErrorResponse } from './utils';

dotenv.config()

// const SAMPLE_TODOS=[
//     'Implement REST API',
//     'Implement GET All todos endpoint',
//     'Implement POST new todo',
//     'Implement error handling',
// ].map(text => new Todo(uuidv4(), text, TodoStatus.ACTIVE))

// let todos = new Map<string, Todo>();
// console.log(process.env.DB_FILE)
// readFile(process.env.DB_FILE, { encoding: 'utf8' }).then(todojson => {
//     const todosArr = JSON.parse(todojson.toString())
    
//     todosArr.forEach(todo => {
//         todos.set(todo.id, todo)
//     })
//     console.log(todos)
// })

const app = express()

app.set('postsRepo', new JsonFileRepository<Todo>(process.env.DB_FILE));

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}))

app.use(express.json({ 'limit': '10mb' }))

app.get("/api/todos", async (req, res) => {
    const repo = req.app.get('postsRepo') as Repository<Todo>;
    const result = await repo.findAll()
    res.json(result)
}).get("/api/todos/:todoId", async (req, res) => {
    const repo = req.app.get('postsRepo') as Repository<Todo>;
    res.json(await repo.findById(req.params["todoId"]))
}).post('/api/todos', async (req, res, next) => {
    const repo = req.app.get('postsRepo') as Repository<Todo>;
    const post = req.body as Todo;
    try {
        await validator.validate(post, {
            title: 'required|string|min:3|max:80',
            content: 'string|max:1024',
            authorId: 'required|regex:[0-9a-f\\-]{36}',
            imageUrl: 'url',
            tags: 'required|array',
            'tags.*': 'string|regex:\\w+',
            categories: 'required|array',
            'categories.*': 'string'
        });
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    const now = new Date();
    try {
        const created = await repo.create(post);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/posts/${created.id}`).json(created);
    } catch(err) {
        console.log(err);
        sendErrorResponse(req, res, 500, `Unable to create post '${post.text}: ${err.message}`, err);
    }
});


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})

app.on('error', err => console.error(`Server Error: ${err}`));
app.on('clientError', err => console.error(`Client Error: ${err}`));