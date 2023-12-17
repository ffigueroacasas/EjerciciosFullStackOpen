import React, { useEffect, useState } from 'react'
import { SearchBar  } from './components/SearchBar.jsx'
import { CountryList } from './components/CountryList.jsx'
import axios from 'axios'


function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleTyping = () => {
    setSearch(event.target.value)
  }

  const hook = () => {
    if(search != ""){
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then((response) => setCountries(response.data))
    }
  }

  useEffect(hook, [search])

  return (
    <div>
      <SearchBar search={search} handleTyping={handleTyping} />
      <CountryList countries={countries} setCountries={setCountries}/>
    </div>
  )
}

export default App
