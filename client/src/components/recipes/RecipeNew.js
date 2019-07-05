import React from 'react';
import RecipeForm from './RecipeForm';
import { Link } from "react-router-dom";

const RecipeNew = () => {
    return (
        <div>
            <h1>Add New Recipe</h1>
            <Link to="/recipes">View all recipes</Link><br/><br/><br/>
            <RecipeForm />
        </div>
    )
}

export default RecipeNew;