import express from 'express'
const app = express()
const port = 3000

const database = {
    users: []
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)
