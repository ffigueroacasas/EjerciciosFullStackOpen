import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import SearchBar from './components/SearchBar.jsx'
import List from './components/List.jsx'
import personsService from './services/phones.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)

  useEffect(() => {
    personsService.getAll()
      .then(notes => {
        setPersons(notes)
        setFiltered(notes)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex((person) =>person.name === newName.trim()) === -1){
      personsService.create({name: newName, number: newNumber})
           .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setFiltered(filtered.concat(newPerson))
           })
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

  const deletePerson = id => {
    let personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.remove(id).then((status) => {
        if (status === 200){
          setPersons(persons.filter(person => person.id !== id))
          setFiltered(persons.filter(person => person.id !== id))
        }
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Find a specific person: <SearchBar handleSearch={handleSearch} />
      <h2>Add a new Person:</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <List filtered={filtered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
