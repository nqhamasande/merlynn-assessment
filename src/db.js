const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const DrinkChoiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  temperature: {
    type: String,
    required: true
  },
  sugarLevel: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DrinkChoice', DrinkChoiceSchema);