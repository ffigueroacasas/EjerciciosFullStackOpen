import { useQuery } from '@apollo/client'
import {ALL_BOOKS} from '../queries'
import { useEffect, useState } from 'react'

const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (result.data){
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      let foundGenres = ['all']
      allBooks.forEach(book => {
        book.genres.forEach(genre => {
          if(foundGenres.indexOf(genre) === -1) {
            foundGenres.push(genre)
          }
        })
      })
      setGenres(foundGenres)
      setSelectedGenre('all')
    }
  }, [result]) //eslint-disable-line

  useEffect(() => {
    if (selectedGenre === 'all') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((b) => b.genres.indexOf(selectedGenre) !== -1)
      )
    }
  }, [books, selectedGenre])

  if (!show) {
    return null
  }

  if (result.loading){
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick={ () => setSelectedGenre(genre)}>{genre}</button>)}
      </div>
    </div>
  )
}

export default Books
