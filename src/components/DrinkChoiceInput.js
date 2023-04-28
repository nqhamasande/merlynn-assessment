import React from "react";

function DrinkChoiceInput({input}) {
    return(
        <div>
            <input name={input.name} placeholder={input.question} />
        </div>
    )
    
}
export default DrinkChoiceInput;