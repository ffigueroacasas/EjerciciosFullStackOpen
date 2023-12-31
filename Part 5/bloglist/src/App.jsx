import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import login from './services/login'
import Togglable from './components/Togglable.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (error) {
      setNotification({message: 'wrong username or password', isAnError: true})
      setTimeout(() => setNotification(null), 5000);
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog)
    setNotification({message: `a new blog "${blog.title}" by ${blog.author} has been added`, isAnError: false})
    setTimeout(() => setNotification(null), 5000)
    setBlogs(blogs.concat(blog))
  }

  if (user === null){
    return (
      <div>
        <form onSubmit={handleLogIn}>
        <h2>Log in to the blogs application!</h2>
        <div>
          <p>Username: </p>
          <input 
            type="text" 
            onChange={({target}) => setUsername(target.value)}
            value={username}
            name="Username"
          />
        </div>
        <div>
          <p>Password: </p>
          <input
            type="password" 
            onChange={({target}) => setPassword(target.value)}
            name="Password"
            value={password}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <Notification notification={notification}/>
      </div> 
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} /> 
      <p>{user.name} logged in</p> <button onClick={handleLogOut}>Log Out</button>
      <Togglable message="New Blog">
        <CreateBlogForm addBlog={addBlog}/>  
      </Togglable> 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App