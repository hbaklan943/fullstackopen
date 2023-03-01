const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('invalid users', () => {
  test('should be responded with 400 and with an error message', async () => {
    const invalidUser = {
      username: 'Ab',
      password: 'xx'
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password length must be minimum 3')
  })
})