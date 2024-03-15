import { DiaryEntry } from "../types"

interface EntryProps {
  entry: DiaryEntry
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;
  return (
    <div>
          <strong>{entry.id}: {entry.date}</strong>
          <ul>
            <li>Weather: {entry.weather}</li>
            <li>Visibility: {entry.visibility}</li>
          </ul>
      </div>
  )
};

export default Entry;