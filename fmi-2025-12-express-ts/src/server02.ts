import * as express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app= express()

app.get("/flights/:from-:to", (req, res) => {
    res.json(req.params)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})

app.on('error', err => console.error(`Server Error: ${err}`));
app.on('clientError', err => console.error(`Client Error: ${err}`));