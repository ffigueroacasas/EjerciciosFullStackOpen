import { useEffect, useState } from "react";
import { DiaryEntry } from "./types.ts";
import diaryService from "./services/diaryService.ts";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries().then(data => {
      if (data){
        setEntries(data);
      }
    })
  }, [])
  
  return (
    <div>
      <h2>Flight Diary Entries</h2>
      {entries.map(entry => {
        return (
          <div key={entry.id}>
            <strong>{entry.id}: {entry.date}</strong>
            <ul>
              <li>Weather: {entry.weather}</li>
              <li>Visibility: {entry.visibility}</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
};

export default App;