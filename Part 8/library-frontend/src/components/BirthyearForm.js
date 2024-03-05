import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js"
import Select from 'react-select'

const BirthyearForm = ({authors}) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  
  const options = authors.data.allAuthors.map(author => { return { value: author.name, label:author.name} })

  const [ editAuthor ] = useMutation(EDIT_AUTHOR , {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: {name: name.value , setBornTo: Number(born)}})
    
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h3>
        Set Birthyear
      </h3>
      <form onSubmit={submit}>
        <h4>name</h4>
        <Select
          defaultValue={name}
          onChange={setName}
          options={options}
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