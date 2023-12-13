import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '012-3456789' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex((person) =>person.name === newName.trim()) === -1){
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    else{
      window.alert(`${newName.trim()} is already on the phone book`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) =><p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
