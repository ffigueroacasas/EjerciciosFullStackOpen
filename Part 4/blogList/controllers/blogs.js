const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
      response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url){
    return response.status(400).end()
  }
  await blog.save()
  response.status(201).json(blog)
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