import { useState, useEffect } from "react"
import { LOGIN } from "../queries.js"
import { useMutation } from "@apollo/client"

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    } 
  })

  useEffect(() => {
    if ( result.data ) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-token', token)
      }
    }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password }})

    setUsername('')
    setPassword('')
    setPage('authors')
  }
  
  if (!show) {
    return null
  }
  
  return (
    <div>
      <h4>Log in Form</h4>
      <form onSubmit={submit}>
        <div>
          <p>username:</p>
          <input
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div>
          <p>password:</p>
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default Login