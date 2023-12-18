export const Weather = ({country, weather}) => {
  return (
    <div>
      <h3>Wheather in {country.capital}</h3>
      <p>Temperature: {/*weather.temperature*/}</p>
      <img src={weather.current.weather_icons[0]} />
      <p>Wind: {weather.current.wind_speed}mph {weather.current.wind_dir}</p>
    </div>
  )
}