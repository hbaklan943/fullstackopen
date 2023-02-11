const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---------');
    next()
}
app.use(requestLogger)

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms :body'))

let persons = [
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
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    response.send(`
    <h1>The phonebook has ${persons.length} people</h1>
    <h1>${new Date()}</h1>    
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(p => p.id === id)

    if (note) {
        response.json(note)
    }
    else { response.status(404).end() }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            "error": 'name or number missing',
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name is already exists'
        })
    }
    const newPerson = {
        "id": Math.floor(Math.random() * 200),
        "name": body.name,
        "number": body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(3001, () => {
    console.log("server is running");
})

