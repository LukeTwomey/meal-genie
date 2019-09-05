import React from 'react';
import RecipeImage from './RecipeImage';
import { Link } from "react-router-dom";
import './RecipeCard.css';

const RecipeCard = (props) => {
    const { recipe } = props;
    const recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();

    return (
        <Link to={`/recipes/${recipeUrlName}`}>
            <div className="recipeCard" >
                <RecipeImage image={recipe.image}/>
                <h2>{recipe.name}</h2>
            </div>
        </Link>
    )
}

export default RecipeCard;