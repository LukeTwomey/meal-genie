import React from "react"

const IngredientInputs = (props) => {
  return (
    props.ingredients.map((val, i)=> {
      let ingredientId = `ingredient-${i}`, quantityId = `quantity-${i}`
      return (
        <fieldset key={i}>
          <label htmlFor={ingredientId}>{`Ingredient #${i + 1}`}</label>
          <input
            type="text"
            name={ingredientId}
            data-id={i}
            id={ingredientId}
            value={props.ingredients[i].name} 
            className="ingredient"
            onChange={props.onChange}
          />
          <label htmlFor={quantityId}>Quantity</label>
          <input
            type="text"
            name={quantityId}
            data-id={i}
            id={quantityId}
            value={props.ingredients[i].quantity} 
            className="quantity"
            onChange={props.onChange}
          />
        </fieldset>
      )
    })
  )
}

export default IngredientInputs