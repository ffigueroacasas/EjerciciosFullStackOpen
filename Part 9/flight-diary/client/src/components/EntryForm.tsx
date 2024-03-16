import { useState } from "react";

interface EntryFormProps {
  submit: (event: React.SyntheticEvent, date: string, weather: string, visibility: string) => void
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');

  return (
    <form onSubmit={event => {
      props.submit(event, date, weather, visibility);
      setDate('');
      setWeather('');
      setVisibility('');
    }}>
      Date: <input type="date" onChange={({target}) => setDate(target.value)}/>
      <br />
      <strong>Weather:</strong> 
        <input type="radio" name="weather" id="sunny" checked={weather === 'sunny'} onChange={() => setWeather("sunny")}/>
        <label htmlFor="sunny">Sunny</label>
      
        <input type="radio" name="weather" id="rainy" checked={weather === 'rainy'} onChange={() => setWeather("rainy")}/>
        <label htmlFor="rainy">Rainy</label>
      
        <input type="radio" name="weather" id="cloudy" checked={weather === 'cloudy'} onChange={() => setWeather("cloudy")}/>
        <label htmlFor="cloudy">Cloudy</label>
      
        <input type="radio" name="weather" id="stormy" checked={weather === 'stormy'} onChange={() => setWeather("stormy")}/>
        <label htmlFor="stormy">Stormy</label>
      
        <input type="radio" name="weather" id="windy" checked={weather === 'windy'} onChange={() => setWeather("windy")}/>
        <label htmlFor="windy">Windy</label>
        <br />
      <strong>Visibility:</strong> 
        <input type="radio" name="visibility" id="great" checked={visibility === 'great'} onChange={() => setVisibility("great")} />
        <label htmlFor="great">Great</label>

        <input type="radio" name="visibility" id="good" checked={visibility === 'good'} onChange={() => setVisibility("good")} />
        <label htmlFor="good">Good</label>

        <input type="radio" name="visibility" id="ok" checked={visibility === 'ok'} onChange={() => setVisibility("ok")} />
        <label htmlFor="ok">OK</label>

        <input type="radio" name="visibility" id="poor" checked={visibility === 'poor'} onChange={() => setVisibility("poor")} />
        <label htmlFor="poor">Poor</label>
        <br />
      <button type="submit">Submit</button>
    </form>
  )
};

export default EntryForm;