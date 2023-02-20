const config = require('./utils/config')
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to mongodb');
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)





module.exports = app