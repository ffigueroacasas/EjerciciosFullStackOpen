import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import SearchBar from './components/SearchBar.jsx'
import List from './components/List.jsx'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex((person) =>person.name === newName.trim()) === -1){
      setPersons(persons.concat({name: newName, number: newNumber}))
      let newPersons = persons.concat({name: newName, number: newNumber})
      setFiltered(newPersons)
      axios
           .post("http://localhost:3001/persons", {name: newName, number: newNumber})
           .then(response => {
            setPersons(persons.concat(response.data))
            setFiltered(filtered.concat(response.data))
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
