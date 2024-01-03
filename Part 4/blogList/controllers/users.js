const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const user = new User({
    username: req.body.username,
    name: req.body.name, 
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter