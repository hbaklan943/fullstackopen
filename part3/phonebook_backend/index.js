require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('build'))
app.use(cors())
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

app.get('/api/people', (request, response) => {
    Person.find({}).then(allPeople => {
        response.json(allPeople)
    })
})

app.get('/api/info', (request, response) => {
    response.send(`
    <h1>The phonebook has ${persons.length} people</h1>
    <h1>${new Date()}</h1>    
    `)
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(p => p.id === id)

    if (note) {
        response.json(note)
    }
    else { response.status(404).end() }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/people', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            "error": 'name or number missing',
        })
    }

    const newPerson = new Person({
        "name": body.name,
        "number": body.number
    })
    newPerson.save()
        .then(savedPerson => response.json(save))
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is running");
})

