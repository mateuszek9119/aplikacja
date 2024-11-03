const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({

  title: { type: String, required: [true, "Pole 'tytuł' nie może być puste !"] },
  description: { type: String, required: [true, "Pole 'opis' nie może być puste !"] },
  date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('News', newSchema)