"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const uuid_1 = require("uuid");
const fs = require("node:fs/promises");
const HOSTNAME = 'localhost';
const PORT = 9000;
const DB_FILE = '../todos.json';
const todos = [
    { id: (0, uuid_1.v4)(), text: 'Implement REST Server using NodeJS' },
    { id: (0, uuid_1.v4)(), text: 'Implement GET all TODOs' },
    { id: (0, uuid_1.v4)(), text: 'Implement POST new TODO' },
    { id: (0, uuid_1.v4)(), text: 'Implement DELETE existing TODO by ID' },
    { id: (0, uuid_1.v4)(), text: 'Implement error handling' }
];
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path = url.parse(req.url).pathname;
    console.log(`${req.method} for: ${path}`);
    const matchTodoId = /^\/api\/todos\/([0-9a-fA-F\\-]{36})$/.exec(path);
    // console.log(req.headers);
    if (req.method === 'GET' && path === '/api/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }
    else if ((req.method === 'POST' && path === '/api/todos')) {
        const bodyChunks = [];
        req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const body = Buffer.concat(bodyChunks).toString('utf8');
            const newTodo = JSON.parse(body);
            console.log(`Creating new TODO: ${JSON.stringify(newTodo)}`);
            newTodo.id = (0, uuid_1.v4)();
            todos.push(newTodo);
            yield fs.writeFile(DB_FILE, JSON.stringify(todos), { encoding: 'utf8' });
            // handle error for HTTP response
            res.on('error', (err) => {
                console.error(err);
            });
            res.writeHead(201, {
                'Content-Type': 'application/json',
                'Location': `http://${HOSTNAME}:${PORT}${path}/${newTodo.id}`
            });
            res.end(JSON.stringify(newTodo));
        })).on('error', (err) => {
            console.error(err.stack);
        });
    }
    else if (req.method === 'GET' && matchTodoId) {
        console.log(matchTodoId);
        const todoId = matchTodoId[1];
        const todo = todos.find(td => td.id === todoId);
        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        }
        else {
            sendErrorResponse(404, `TODO with ID='${todoId}' not found`, res);
        }
    }
    else if (req.method === 'DELETE' && matchTodoId) {
        console.log(matchTodoId);
        const todoId = matchTodoId[1];
        const index = todos.findIndex(td => td.id === todoId);
        if (index >= 0) {
            const deletedTodo = todos[index];
            todos.splice(index, 1);
            yield fs.writeFile(DB_FILE, JSON.stringify(todos), { encoding: 'utf8' });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedTodo));
        }
        else {
            sendErrorResponse(404, `TODO with ID='${todoId}' not found`, res);
        }
    }
    else {
        sendErrorResponse(404, `Endpoint '${path}' not found`, res);
    }
}));
server.on('error', err => console.error(`Server Error: ${err}`));
server.on('clientError', err => console.error(`Client Error: ${err}`));
// Init data from DB_FILE asd start API server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield fs.readFile(DB_FILE, { encoding: 'utf8' });
        console.log(todos);
        server.listen(PORT, HOSTNAME, () => {
            console.log(`HTTP Server listeneing on: http://${HOSTNAME}:${PORT}`);
        });
    }
    catch (err) {
        console.error(`TODOs DB file '${DB_FILE}' does not exist. Creating it with sample TODOs.`);
        fs.writeFile(DB_FILE, JSON.stringify(todos));
    }
}))();
function sendErrorResponse(status, message = '', res) {
    res.writeHead(status || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
//# sourceMappingURL=05-http-rest-api.js.map