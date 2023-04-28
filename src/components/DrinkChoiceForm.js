import React, {useState} from 'react';
import axios from 'axios';
import DrinkChoiceInput from './DrinkChoiceInput';
import "tailwindcss/tailwind.css";
import DrinkChoice from '../models/drinkChoice'


function DrinkChoiceForm({inputs}, onSubmit) {
  let stateObject = {}
  
  inputs.forEach(element => {
    stateObject[`${element.name}`] = ""
  });
    
  const TOM_API_URL = 'https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12/';
  const [state, setState ] = useState(stateObject);
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = {...state}
    Object.keys(input).forEach(key => {
      if (input[key]==="") delete input[key];
    });
    console.log(input)
    let postData = {
      data: {
        type: "scenario",
        attributes: {
          input
        }
      }
    }
    console.log(postData)

    axios.post(`${TOM_API_URL}`, postData, {
      headers: {
        'Authorization': `Token 9307bfd5fa011428ff198bb37547f979`
      }
    }).then(res => {
        console.log(res.data.data)
        setResult(res.data.data);
      })
      .catch(err => {
        console.log(err)
        setErrorMessage(err.message);
      });
  };

  {
    let i = -1
    const InputList = inputs.map(input => {
      i += 1
      return (
        <div key={i}>
          <input name={input.name} placeholder={input.question} value={state[`${input.name}`]} onChange={(e)=>handleChange(e)} />
        </div>
      )
    })
  
    return (
      <div className="max-w-md mx-auto">
        <form className="max-w-md mx-auto" onSubmit={(e)=>handleSubmit(e)}>
          {InputList}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
        </form>
        {
          result && 
          <div>
            <h2 className="text-2xl font-bold mb-2">Decision:</h2>
            <p className="text-gray-700">{result.attributes.decision}</p>
          </div>
        }
      </div>
    );
  }
}

export default DrinkChoiceForm;