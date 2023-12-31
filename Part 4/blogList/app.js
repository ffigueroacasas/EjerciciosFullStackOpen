const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middlewares = require('./utils/middlewares')

const mongoUrl = `mongodb+srv://end-user:Figueroa1907@firstcluster.6wq2ngu.mongodb.net/`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use(middlewares.tokenExtractor)
app.use(middlewares.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middlewares.errorHandler)

module.exports = app