const express = require('express');
const router = express.Router();

const DrinkChoice = require('../models/drinkChoice');

// POST /api/drink-choices - save a new Drink Choice to the database
router.post('/drink-choices', (req, res) => {
  const { name, type, size, temperature, sugarLevel } = req.body;

  // Create a new DrinkChoice object
  const drinkChoice = new DrinkChoice({
    name,
    type,
    size,
    temperature,
    sugarLevel
  });

  // Save the DrinkChoice to the database
  drinkChoice.save()
    .then(() => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;


