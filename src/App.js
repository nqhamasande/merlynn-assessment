import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrinkChoiceForm from './components/DrinkChoiceForm';
import DrinkChoiceResult from './components/DrinkChoiceResult';

function App() {
  const [inputValues, setInputValues] = useState({});
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const TOM_API_URL = 'https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12/';
  //const TOM_API_KEY = '9307bfd5fa011428ff198bb37547f979';

  useEffect(() => {
    // Fetch metadata from the API when the component mounts
    axios.get(`${TOM_API_URL}`, {
      headers: {
        'Authorization': `Token 9307bfd5fa011428ff198bb37547f979`
      }
    })
      .then(res => {
        const data = res.data.data.attributes;
        console.log(data)
        setModel(data);
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${TOM_API_URL}/predict`, model, {
      headers: {
        'Authorization': `Token 9307bfd5fa011428ff198bb37547f979`
      }
    })
      .then(res => {
        setModel(res.data.result);
      })
      .catch(err => {
        setErrorMessage('Error fetching decision from API');
      });
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-4xl font-bold mb-8">Drink Choice App</h1>
      {
        errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )
      }
      {
        model && (
          <DrinkChoiceResult model={model} />
        )
      }
    </div>
  );
}

export default App;
