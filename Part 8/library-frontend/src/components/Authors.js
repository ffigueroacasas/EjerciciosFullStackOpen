import BirthyearForm from "./BirthyearForm.js"

const Authors = ({show, authors}) => {
  if (!show) {
    return null
  }

  if (authors.loading){
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      <BirthyearForm authors={authors}/>
    </div>
  )
}

export default Authors
