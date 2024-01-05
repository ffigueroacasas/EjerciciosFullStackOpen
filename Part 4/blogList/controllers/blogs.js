const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
      response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = request.user
  const blog = new Blog({
    title: request.body.title, 
    url: request.body.url,
    author: request.body.author, 
    likes: request.body.likes,
    user: user.id
  })
  if (!blog.title || !blog.url){
    return response.status(400).end()
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  if (req.user.id.toString() === blog.user.toString())
  {
    await Blog.deleteOne({_id: id})
    res.status(204).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedBlog = {
    author: req.body.author, 
    likes: req.body.likes, 
    url: req.body.url,
    title: req.body.title
  }
  const savedAndUpdatedBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {new: true})
  res.json(savedAndUpdatedBlog)
})

module.exports = blogsRouter