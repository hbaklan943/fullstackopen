const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as arguement')
  process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://aaron:${password}@cluster0.d5ljkm2.mongodb.net/testNoteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('note', noteSchema)


const note = new Note({
  content: 'FULLSTACK is hard',
  important: true,
})

note.save().then(savedNote => {
  console.log(savedNote)
  mongoose.connection.close()
})


/* Note.find({ important: false }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
}) */