import express from 'express';
import { Request, Response } from 'express';

import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(cors({
    origin: 'http://localhost:5173/',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}))

app.get("/users/:userId/posts/:postId", (req: Request, res: Response) => {
    res.json(req.params)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running in http://localhost:${PORT}`) })
