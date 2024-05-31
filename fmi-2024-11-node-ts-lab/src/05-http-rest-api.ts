import * as http from 'http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';

const HOSTNAME = 'localhost';
const PORT = 9000;
const DB_FILE = '../todos.json';

type Todo = {
    id: string,
    text: string
}

const todos: Todo[] = [
    { id: uuidv4(), text: 'Implement REST Server using NodeJS' },
    { id: uuidv4(), text: 'Implement GET all TODOs' },
    { id: uuidv4(), text: 'Implement POST new TODO' },
    { id: uuidv4(), text: 'Implement DELETE existing TODO by ID' },
    { id: uuidv4(), text: 'Implement error handling' }
];

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const path = url.parse(req.url).pathname;
    console.log(`${req.method} for: ${path}`);
    const matchTodoId = /^\/api\/todos\/([0-9a-fA-F\\-]{36})$/.exec(path);
    // console.log(req.headers);
    if (req.method === 'GET' && path === '/api/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } else if ((req.method === 'POST' && path === '/api/todos')) {
        const bodyChunks: Uint8Array[] = [];
        req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', async () => {
                const body = Buffer.concat(bodyChunks).toString('utf8');
                const newTodo: Todo = JSON.parse(body);
                console.log(`Creating new TODO: ${JSON.stringify(newTodo)}`);
                newTodo.id = uuidv4();
                todos.push(newTodo);

                await fs.writeFile(DB_FILE, JSON.stringify(todos), { encoding: 'utf8' });
                // handle error for HTTP response
                res.on('error', (err) => {
                    console.error(err);
                });
                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    'Location': `http://${HOSTNAME}:${PORT}${path}/${newTodo.id}`
                });
                res.end(JSON.stringify(newTodo));
            }).on('error', (err) => {
                console.error(err.stack);
            });
    } else if (req.method === 'GET' && matchTodoId) {
        console.log(matchTodoId);
        const todoId = matchTodoId[1];
        const todo = todos.find(td => td.id === todoId);
        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        } else {
            sendErrorResponse(404, `TODO with ID='${todoId}' not found`, res);
        }
    } else if (req.method === 'DELETE' && matchTodoId) {
        console.log(matchTodoId);
        const todoId = matchTodoId[1];
        const index = todos.findIndex(td => td.id === todoId);
        if (index >= 0) {
            const deletedTodo = todos[index];
            todos.splice(index, 1);
            await fs.writeFile(DB_FILE, JSON.stringify(todos), { encoding: 'utf8' });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedTodo));
        } else {
            sendErrorResponse(404, `TODO with ID='${todoId}' not found`, res);
        }
    } else {
        sendErrorResponse(404, `Endpoint '${path}' not found`, res);
    }
});

server.on('error', err => console.error(`Server Error: ${err}`));
server.on('clientError', err => console.error(`Client Error: ${err}`));

// Init data from DB_FILE asd start API server
(async () => {
    try {
        const todos = await fs.readFile(DB_FILE, { encoding: 'utf8' });
        console.log(todos)
        server.listen(PORT, HOSTNAME, () => {
            console.log(`HTTP Server listeneing on: http://${HOSTNAME}:${PORT}`);
        })
    } catch (err) {
        console.error(`TODOs DB file '${DB_FILE}' does not exist. Creating it with sample TODOs.`);
        fs.writeFile(DB_FILE, JSON.stringify(todos));
    }
})();

function sendErrorResponse(status: number, message: string = '', res: http.ServerResponse<http.IncomingMessage>) {
    res.writeHead(status || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}

