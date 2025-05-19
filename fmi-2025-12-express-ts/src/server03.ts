import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from './model/todo';
import {readFile, writeFile} from 'fs/promises';

dotenv.config()

const SAMPLE_TODOS=[
    'Implement REST API',
    'Implement GET All todos endpoint',
    'Implement POST new todo',
    'Implement error handling',
].map(text => new Todo(uuidv4(), text, TodoStatus.ACTIVE))

let todos = [];
console.log(process.env.DB_FILE)
readFile(process.env.DB_FILE, { encoding: 'utf8' }).then(todojson => {
    todos = JSON.parse(todojson.toString())
    console.log(`TODS successfully loaded: ${JSON.stringify(todos)}`)
})

const app = express()

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}))

app.use(express.json({ 'limit': '10mb' }))

app.get("/api/todos", (req, res) => {
    res.json(todos)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})

app.on('error', err => console.error(`Server Error: ${err}`));
app.on('clientError', err => console.error(`Client Error: ${err}`));