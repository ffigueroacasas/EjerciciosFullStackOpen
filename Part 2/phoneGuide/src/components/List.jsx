import Person from "./Person"

const List = ({filtered}) => {
  return (
    <div>
        {filtered.map((person) =><Person key={person.name} person={person}/>)}
    </div>
  )
}

export default List