import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex((person) =>person.name === newName.trim()) === -1){
      setPersons(persons.concat({name: newName, number: newNumber}))
      let newPersons = persons.concat({name: newName, number: newNumber})
      setFiltered(newPersons)
    }
    else{
      window.alert(`${newName.trim()} is already on the phone book`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleSearch = () => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Find a specific person: <input onChange={handleSearch} />
      <h2>Add a new Person:</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
          number: <input type="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered.map((person) =><p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
