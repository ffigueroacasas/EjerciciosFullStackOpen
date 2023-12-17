export const CountryList = ({countries, setCountries}) => {
  if (countries.length === 0) return (
    <h3>write in order to search for countries</h3>
  )
  else if (countries.length > 10) return (
    <h3>too many matches, specify another filter</h3>
  )
  else if (countries.length > 1 && countries.length <= 10) return (
    <div>
      {countries.map((country) => 
        <div key={country.name.common}>
          <li>{country.name.common}</li> <button onClick={() => setCountries([country])}>Show Details</button>
        </div>
        )}
    </div>
  )
  else if (countries.length === 1) {
    let country = countries[0]
    return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>{Object.values(country.languages).map((val) => <li key={val}>{val}</li>)}</ul>
      <img src={country.flags.png} alt="" />
    </div>
  )}
}