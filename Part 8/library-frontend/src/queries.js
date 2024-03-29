import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query{
    allAuthors{
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query{
    allBooks{
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!)
  {
    addBook(
      title: $title, 
      author: $author, 
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!)
  {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!)
  {
    login(username: $username, password: $password){
      value
    }
  }
`

export const LOGGED_USER = gql`
  query{
    me{
      username
      favoriteGenre
      id
    }
  }
`
