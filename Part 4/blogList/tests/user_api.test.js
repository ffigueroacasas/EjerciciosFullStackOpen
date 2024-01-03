const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)
const User = require('../models/user')

describe('when trying to create a user', () => {
  beforeEach(async () => {
  await User.deleteMany({})
  })
  
  test('should reject user creation due to missing username', async  () => {
    const usersAtStart = await User.find({})
    const newUser = {
      name: "test",
      password: "test password"
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await User.find({})
    expect(response.body.error).toEqual("User validation failed: username: Path `username` is required.")
    expect(usersAtStart.length).toEqual(usersAtEnd.length)
  })

  test('should reject user creation due to too short username', async  () => {
    const usersAtStart = await User.find({})
    const newUser = {
      username: "a",
      password: "test password"
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await User.find({})
    expect(response.body.error).toEqual(`User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)
    expect(usersAtStart.length).toEqual(usersAtEnd.length)
  })

  test('should reject user creation because the username is not unique', async  () => {
    const uniqueUser = {
      username: "unique",
      name: "unique username user",
      password: "password"
    }
    await api.post('/api/users').send(uniqueUser)
    const usersAtStart = await User.find({})
    const repeatedUser = {
      username: "unique",
      name: "non unique username user",
      password: "password"
    }
    const response = await api
      .post('/api/users')
      .send(repeatedUser)
      .expect(400)
    const usersAtEnd = await User.find({})
    expect(response.body.error).toEqual(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${repeatedUser.username}\``)
    expect(usersAtStart.length).toEqual(usersAtEnd.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
  })