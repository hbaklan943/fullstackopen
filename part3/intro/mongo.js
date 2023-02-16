const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as arguement')
  process.exit(1)
}


const password = process.argv[2]

const url =
    `mongodb+srv://aaron:${password}@cluster0.d5ljkm2.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('note', noteSchema)


const note = new Note({
  content: 'HTML is easy',
  important: true,
})


Note.find({ important: false }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})