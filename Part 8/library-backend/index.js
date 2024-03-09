const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log('successfully connected to database'))
  .catch((error) => console.error('error connecting to database: ', error.message))

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let booksToBeReturned = await Book.find({})
      if (args.author){
        booksToBeReturned = booksToBeReturned.filter(book => book.author === args.author)
      }
      if (args.genre) {
        booksToBeReturned = booksToBeReturned.filter(book => book.genres.includes(args.genre))
      }
      return booksToBeReturned
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      let author = await Author.findOne({name: root.name})
      if (!author) {
        throw new GraphQLError('non existent author', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let booksByAuthor = await Book.find({author: author})
      return booksByAuthor.length
    }
  },

  Book: {
    author: async (root) => {
      const authorId = root.author;
      const author = await Author.findById(authorId);
      return author;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      console.log(currentUser)
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({
          name: args.author, 
          born: null
        })
        author = await author.save()
      }
      console.log(author)
      const book = new Book({...args, author: author._id})
      return book.save()
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser)
      if (!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      let author = await Author.findOne({name: args.name})
      if (!author){
        throw new GraphQLError('non existent author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      let savedAuthor = Author.findOneAndUpdate({name: author.name}, {born: args.setBornTo}, { new: true })
      return savedAuthor
    },
    createUser: async (root, args) => {
      const user = new User ({username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
        .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== 'password'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})