import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-solid-svg-icons';

const IngredientInputs = (props) => {
  return (
    props.ingredients.map((val, i) => {
      let ingredientId = `ingredient-${i}`, quantityId = `quantity-${i}`, unitId = `unit-${i}`
      return (
        <div className="ingredientContainer" key={i}>
          <fieldset>
            <label htmlFor={ingredientId}>Name</label>
            <input
              type="text"
              name={ingredientId}
              data-id={i}
              id={ingredientId}
              value={props.ingredients[i].ingredient}
              className="ingredient"
              onChange={props.onChange}
            />
            <div className="quantityContainer">
              <label htmlFor={quantityId}>Quantity</label>
              <input
                type="number"
                name={quantityId}
                data-id={i}
                id={quantityId}
                value={props.ingredients[i].quantity}
                className="quantity"
                onChange={props.onChange}
              />
            </div>
            <div className="unitContainer">
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
            </div>
          </fieldset>
          <div className="deleteButton" data-id={i} onClick={props.deleteIngredient}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </div>
        </div>
      )
    })
  )
}

export default IngredientInputs