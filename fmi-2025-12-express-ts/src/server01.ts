import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app= express()

app.get("/", (req, res) => {
    res.send('<html><body><h1>Hello from ExpressJS!</h1</body</html>')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})
