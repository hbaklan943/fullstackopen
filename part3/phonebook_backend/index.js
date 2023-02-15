require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---------');
    next()
}
morgan.token('body', req => {
    return JSON.stringify(req.body)
})


const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)
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

app.get('/api/people/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
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
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/people/:id', (request, response, next) => {

    const { name, number } = request.body
    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: query })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    console.log(error.name);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
}
app.use(errorHandler)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is running");
})

