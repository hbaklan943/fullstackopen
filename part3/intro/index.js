require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')


const app = express();
app.use(express.static('build'))
app.use(cors())
app.use(express.json())


app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note =>
        response.json(note)
    )
})


app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})


app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})


app.get('/api/notes', (request, response) => {
    Note.find({}).then(allNotes => {
        response.json(allNotes)
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})