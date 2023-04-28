import React from 'react';
import DrinkChoiceForm from './DrinkChoiceForm';

function DrinkChoiceResult({ model }) {
  return (
    <div>
      <h2>{model.name}</h2>
      <DrinkChoiceForm inputs={model.metadata.attributes} />
    </div>
  );
}

export default DrinkChoiceResult;