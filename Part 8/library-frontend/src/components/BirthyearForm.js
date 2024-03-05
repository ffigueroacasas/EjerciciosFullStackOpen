import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js"

const BirthyearForm = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR , {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: {name, setBornTo: Number(born)}})
    
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>
        Set Birthyear
      </h3>
      <form onSubmit={submit}>
        <h4>name</h4>
        <input
          value={name}
          onChange={({target}) => setName(target.value)}
          
        />
        <h4>born</h4>
        <input
          value={born}
          onChange={({target}) => setBorn(target.value)}
        />
        <button type="submit">set birth year</button>
      </form>
    </div>
  )
}

export default BirthyearForm