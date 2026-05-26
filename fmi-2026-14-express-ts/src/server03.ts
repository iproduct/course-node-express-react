import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app= express()

app.get("/flights/:from-:to", (req, res) => {
    res.json(req.params)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})