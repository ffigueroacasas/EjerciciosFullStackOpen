const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 10000)

test('retrieves all blogs from database', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
});

test('id attribute should be defined', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
});

test('it should create a new blog in the database', async () => {
  const newBlog = {
      title: "Test Blog",
      author: "Developer",
      url: "https://freecodecamp.com/",
      likes: 7
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain("Test Blog")
});

test('for a blog without the likes attribute, it should assign 0 likes', async () => {
  const newBlog = {
      title: "Test Blog",
      author: "Developer",
      url: "https://freecodecamp.com/"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes[likes.length - 1]).toEqual(0)
});

test('if the title or url are missing, it should return 400 Bad Request', async () => {
  const newBlog = {
      author: "Developer"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('it should delete a blog if id is valid', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await Blog.find({})
  const ids = blogsAtEnd.map(blog => blog.id)
  expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
  expect(ids).not.toContain(blogToDelete.id)
})

test('it should update an existing blog if id is valid', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = {
    id: blogsAtStart[0].id,
    title: blogsAtStart[0].title, 
    author: blogsAtStart[0].author,
    url: blogsAtStart[0].url,
    likes: blogsAtStart[0].likes + 1
  }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await Blog.find({})
  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  expect(blogsAtStart.length).toEqual(blogsAtEnd.length)
  expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
});

afterAll(() => {
  mongoose.connection.close()
  })