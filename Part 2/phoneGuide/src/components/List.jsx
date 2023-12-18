import Person from "./Person"

const List = ({filtered, deletePerson}) => {
  return (
    <div>
        {filtered.map((person) =><Person key={person.name} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default List