const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  if (!req.body.password){
    return res.status(400).json({error: 'password is required'})
  }
  else if (req.body.password.length < 3){
    return res.status(400).json({error: 'password must be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  try {
    const user = new User({
    username: req.body.username,
    name: req.body.name, 
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser)
  }
  catch(exception){
    next(exception)
  }
})

module.exports = usersRouter