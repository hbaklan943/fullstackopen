const { request } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/info', (request, response) => {
    response.send(`
    <h1>The phonebook has ${phonebook.length} people</h1>
    <h1>${new Date()}</h1>    
    `)
})

app.listen(3001, () => {
    console.log("server is running");
})

