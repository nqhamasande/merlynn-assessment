const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/tom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Use middleware for parsing JSON data
app.use(express.json());

// Use the /api/drink-choices endpoint
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const TOM_API_URL = 'https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12/metadata';
const TOM_API_KEY = '9307bfd5fa011428ff198bb37547f979';

// Define the /api/metadata endpoint
app.get('/api/metadata', (req, res) => {
  // Make a GET request to the TOM API metadata endpoint
  axios.get(`${TOM_API_URL}/metadata/drink_choice`, {
    headers: {
      Authorization: `${process.env.TOM_API_KEY}`,
    },
  })
  .then(response => {
    // Extract the model data and input variables from the response
    const { data } = response;
    const { model, inputs } = data;

    // Return the model data and input variables as JSON
    res.json({ model, inputs });
  })
  .catch(error => {
    // Return an error message if the request fails
    res.status(500).json({ message: 'Error fetching metadata from TOM API' });
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
