import { DiaryEntry } from "../types";
import Entry from "./Entry.tsx";

interface EntryListProps {
  entries: Array<DiaryEntry>
}

const EntryList = (props: EntryListProps) => {
  return (
    <div>
      {props.entries.map(entry => {
        return (
          <Entry entry={entry} key={entry.id}/> 
        )
      })}
    </div>
  )
}

export default EntryList;

