const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log(`connecting to ${url}`);
mongoose.connect(url)
    .then(result => console.log('connected to MongoDb'))
    .catch(error => console.log('error connecting to monogdb', error.message))


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: (number) => {
            let regex = /[0-9]+-[0-9]+/i
            return regex.test(number) && (number.split('-')[0].length === 2 || number.split('-')[0].length === 3) && (number.split('-').length === 2)
        },
        required: true
    },
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('person', personSchema)