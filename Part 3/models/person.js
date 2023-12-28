const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
require("dotenv").config()

const url = process.env.MONGO_DB_URI

console.log("connecting to ", url)

mongoose.connect(url).then( () => {
  console.log("connected succesfully to the database")
}).catch(error => {
  console.log("There's been an error: ", error.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    unique: true
  }, 
  number: {
    type: String,
    minlength: 8
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
