require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
morgan.token("body", (req, res) => JSON.stringify(req.body) === "{}" ? null : ` - ${JSON.stringify(req.body)}`)
app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"))

app.get("/persons", (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get("/info", (req, res) => {
  Person.find({})
    .then(persons => res.end(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`))
})

app.get("/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => res.json(person))
    .catch(error => res.status(404).end())
})

app.delete("/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(res.status(204).end())
    .catch(error => next(error))
})

app.post("/persons", (req, res, next) => {
  const body = req.body
  if (body.name === undefined || body.number === undefined){
    return res.status(400).json({error: "data missing"})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put("/persons/:id", (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name, 
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error)
  console.log("I grabbed it")
  if (error.name === "CastError") {
    return res.status(400).send({ error: "id is in the wrong format" })
  } else if (error.name === "ValidationError"){
    return res.status(400).json(error)
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})