import express from 'express';
import { Request, Response } from 'express';

import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running in http://localhost:${PORT}`) })
