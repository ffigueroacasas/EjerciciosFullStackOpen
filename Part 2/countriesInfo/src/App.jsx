import React, { useEffect, useState } from 'react'
import { SearchBar  } from './components/SearchBar.jsx'
import { CountryList } from './components/CountryList.jsx'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})

  const handleTyping = () => {
    setSearch(event.target.value)
  }

  const countriesHook = () => {
    if(search != ""){
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then((response) => setCountries(response.data))
    }
  }

  useEffect(countriesHook, [search])

  const weatherHook = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    if (countries.length === 1){
      axios
           .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${countries[0].capital}`)
           .then((response) => {
              setWeather(response.data.current)
              console.log(response)
           })
    }
  }

  useEffect(weatherHook, [countries])

  return (
    <div>
      <SearchBar search={search} handleTyping={handleTyping} />
      <CountryList countries={countries} setCountries={setCountries} weather={weather}/>
    </div>
  )
}

export default App
