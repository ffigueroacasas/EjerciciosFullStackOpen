import { useState } from "react";

interface EntryFormProps {
  submit: (event: React.SyntheticEvent, date: string, weather: string, visibility: string) => void
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('')

  

  return (
    <form onSubmit={event => {
      props.submit(event, date, weather, visibility);
      setDate('');
      setWeather('');
      setVisibility('');
    }}>
      Date: <input type="date" onChange={({target}) => setDate(target.value)}/>
      Weather: <input type="text" onChange={({target}) => setWeather(target.value)}/>
      Visibility: <input type="text" onChange={({target}) => setVisibility(target.value)}/>
      <button type="submit">Submit</button>
    </form>
  )
};

export default EntryForm;