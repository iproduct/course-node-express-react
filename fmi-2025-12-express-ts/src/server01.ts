import * as express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app= express()

app.get("/", (req, res) => {
    res.send('Hello from ExpressJS!')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})
