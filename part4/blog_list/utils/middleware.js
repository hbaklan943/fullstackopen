const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}


const tokenExtractor = (request, response, next) => {
  const getTokenFrom = request => {
    console.log('extracting token ...');
    const authorization = request.get('authorization')
    console.log('auth is :', authorization);
    if (authorization && authorization.startsWith('Bearer ')) {
      console.log(authorization);
      return authorization.replace('Bearer ', '')
    }
    return response.status(401).json({ error: "token invalid" })
  }

  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  //console.log('extarcting user...');
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  request.user = await User.findById(decodedToken.id)
  //console.log('decoded token: ', decodedToken);
  //console.log('extracted user:', request.user);
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}