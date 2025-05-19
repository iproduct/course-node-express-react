import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from './model/todo';

const SAMPLE_TODOS=[
    'Implement REST API',
    'Implement GET All todos endpoint',
    'Implement POST new todo',
    'Implement error handling',
].map(text => new Todo(uuidv4(), text, TodoStatus.ACTIVE))



dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}))

app.use(express.json({ 'limit': '10mb' }))

app.get("/api/todos", (req, res) => {
    res.json(SAMPLE_TODOS)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})

app.on('error', err => console.error(`Server Error: ${err}`));
app.on('clientError', err => console.error(`Client Error: ${err}`));