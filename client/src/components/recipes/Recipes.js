import React from 'react';
import { Link } from "react-router-dom";

const Recipes = (props) => {
    console.log(props.recipes);
    const recipes = props.recipes.map((recipe, i) => {
        return <li key={i}>{recipe.name}</li>;
    })
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes}
            </ul>
            <Link to="/recipes/new">Add new recipe</Link>
        </div>
    )
}

export default Recipes;