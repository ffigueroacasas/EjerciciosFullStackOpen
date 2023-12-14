const Form = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
          number: <input type="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form