const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
      response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.user)
  const blog = new Blog(request.body)
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
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
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