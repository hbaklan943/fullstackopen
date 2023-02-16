const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit()
}

if (process.argv.length === 4) {
  console.log(process.argv)
  console.log('missing argument')
  process.exit()
}



const password = process.argv[2]

const url = `mongodb+srv://aaron:${password}@cluster0.d5ljkm2.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('person', personSchema)

const newPerson = new Person({
  name: `${process.argv[3]}`,
  number: `${process.argv[4]}`,
})

function logPeople() {
  Person.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
  })
}

function saveNewPerson() {
  newPerson.save().then((result) => {
    console.log('person saved')
    console.log(result)
    mongoose.connection.close()
  })
}



if (process.argv.length === 3) {
  console.log(process.argv)
  logPeople()
}

if (process.argv.length === 5) {
  console.log(process.argv)
  saveNewPerson()
}

