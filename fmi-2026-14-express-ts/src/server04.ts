import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from './model/todo';
import {readFile, writeFile} from 'fs/promises';
import { JsonFileRepository } from './dao/json-file-repository';
import { Repository } from './dao/repository';
import { sendErrorResponse } from './utils';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

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

export const HOST = process.env.HOST ||'localhost';
const PORT = process.env.PORT || 8080

const app = express()

const ajv = new Ajv();
addFormats(ajv); // Enforces string formats like email

// All rules are defined strictly as JSON strings or numbers
const schema = {
  type: "object",
  properties: {
    id: {type: "string", 
      format: "uuid" // Enforces a valid UUID structure
    },
    text: { type: "string", format: "email" },
    status: { type: "number", minimum: 0, maximum: 1}
  },
  required: ["text"]
};

const validateTodo = ajv.compile(schema);
app.set('validateTodo', validateTodo);

app.set('todosRepo', new JsonFileRepository<Todo>((process.env as any).DB_FILE));

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}))

app.use(express.json({ 'limit': '10mb' }))

app.get("/api/todos", async (req, res) => {
    const repo = req.app.get('todosRepo') as Repository<Todo>;
    const result = await repo.findAll()
    res.json(result)
}).get("/api/todos/:todoId", async (req, res) => {
    const repo = req.app.get('todosRepo') as Repository<Todo>;
    res.json(await repo.findById(req.params["todoId"]))
}).post('/api/todos', async (req, res, next) => {
    const repo = req.app.get('todosRepo') as Repository<Todo>;
    const post = req.body as Todo;
    const validator = req.app.get('validateTodo');
    try {
        await validator.validate(post);
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${(errors as Error[]).map(e => e.message).join(', ')}`, errors);
        return;
    }
    const now = new Date();
    try {
        const created = await repo.create(post);
        res.status(201).location(`http://${HOST}:${PORT}/api/todos/${created.id}`).json(created);
    } catch(err) {
        console.log(err);
        sendErrorResponse(req, res, 500, `Unable to create post '${post.text}: ${(err as Error).message}`, err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})
