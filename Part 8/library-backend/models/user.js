const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    minlength: 3,
    unique: true
  },
  favoriteGenre: {
    type: String, 
    required: true,
    minlength: 3,
    unique: false
  }
})

module.exports = mongoose.model('User', schema)