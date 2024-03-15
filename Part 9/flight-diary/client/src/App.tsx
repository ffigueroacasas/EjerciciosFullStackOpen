import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import { Weather, Visibility } from "./types";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries().then(data => {
      if (data){
        setEntries(data);
      }
    })
  }, [entries])

  const submit = (event: React.SyntheticEvent, date: string, weather: string, visibility: string) => {
    event.preventDefault();
    const newEntry = {
      date,
      weather: weather as Weather, 
      visibility: visibility as Visibility,
      comment:  ''
    };
    diaryService.addDiary(newEntry).then(data => {if (data) return setEntries(entries.concat(data))});
  }
  
  return (
    <div>
      <h2>Flight Diary Entries</h2>
      <EntryList entries={entries} />
      <EntryForm submit={submit}/>
    </div>
  )
};

export default App;