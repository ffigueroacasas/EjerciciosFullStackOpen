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
    let person = persons.find((person) =>person.name === newName.trim()) 
    if (person === -1){
      personsService.create({name: newName, number: newNumber})
           .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setFiltered(filtered.concat(newPerson))
           })
    }
    else{
      if(window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)){
        personsService
                      .update({...person, number: newNumber})
                      .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ))
                        setFiltered(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ))
                      })
      }
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
