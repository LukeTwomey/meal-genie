import React from "react"

const IngredientInputs = (props) => {
  return (
    props.ingredients.map((val, i) => {
      let ingredientId = `ingredient-${i}`, quantityId = `quantity-${i}`, unitId = `unit-${i}`
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
          <label htmlFor={quantityId}>Unit</label>
          <select
            value={props.ingredients[i].unit}
            name={unitId}
            data-id={i}
            id={quantityId}
            className="unit"
            onChange={props.onChange} >
            <option value="">{/* Blank value */}</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
          </select>
        </fieldset>
      )
    })
  )
}

export default IngredientInputs