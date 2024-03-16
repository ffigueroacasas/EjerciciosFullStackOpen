import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import Notification from "./components/Notification";
import { Weather, Visibility } from "./types";
import { AxiosError } from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    diaryService.getDiaries().then(data => {
      if (data){
        setEntries(data);
      }
    })
  }, [entries]);

  const submit = (event: React.SyntheticEvent, date: string, weather: string, visibility: string) => {
    event.preventDefault();
    const newEntry = {
      date,
      weather: weather as Weather, 
      visibility: visibility as Visibility,
      comment:  ''
    };
    diaryService.addDiary(newEntry)
      .then(data => {if (data) return setEntries(entries.concat(data))})
      .catch(error => {
        if (error instanceof AxiosError && error.response?.data){
          setMessage(error.response.data);
        }
        else{
          setMessage(error.message);
        }
        setTimeout(() => setMessage(''), 5000);
      })
  }
  
  return (
    <div>
      <h2>Flight Diary Entries</h2>
      <Notification message={message}/> 
      <EntryList entries={entries} />
      <EntryForm submit={submit}/>
    </div>
  )
};

export default App;