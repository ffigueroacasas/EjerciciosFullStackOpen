import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    } catch (error) {
      console.log('wrong credentials, error:', error)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (user === null){
    return (
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
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <button onClick={handleLogOut}>Log Out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App