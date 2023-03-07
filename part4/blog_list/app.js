const config = require('./utils/config')
const http = require('http')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to mongodb');
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', middleware.userExtractor, usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app