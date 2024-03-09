import { useEffect, useState } from "react"
import { ALL_BOOKS, LOGGED_USER } from "../queries"
import { useQuery } from "@apollo/client"

const Recommend = ({ show, token }) => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genre, setGenre] = useState('')
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(LOGGED_USER)

  useEffect(() => {
    if (userResult.data && booksResult.data && token){
      setBooks(booksResult.data.allBooks)
      setFilteredBooks(books)
      setGenre(userResult.data.me.favoriteGenre)
    }
  }, [booksResult, userResult]) //eslint-disable-line

  useEffect(() => {
    if (genre) {
      console.log(books, filteredBooks)
      setFilteredBooks(books.filter((b) => b.genres.indexOf(genre) !== -1))
    }
  }, [books, genre])

  if (booksResult.loading){
    <h3>Loading...</h3>
  }

  if (!show) {
    return null
  }

  if (show && !token){
    return (
      <h1>First log in in order to get recommendations</h1>
    )
  }
  
  
  return (
    <div>
      <h3>Books in your favorite genre {genre}</h3>
      <ul>
        {filteredBooks.map(book => <li key={book.title}>{book.title}</li>)}
      </ul>
    </div>
  )
}

export default Recommend