import React, { useState } from 'react'
import Form from './components/Form'
import SearchBar from './components/SearchBar.jsx'
import List from './components/List.jsx'

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
      Find a specific person: <SearchBar handleSearch={handleSearch} />
      <h2>Add a new Person:</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <List filtered={filtered}/>
    </div>
  )
}

export default App
