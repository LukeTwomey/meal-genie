import React from 'react';
import RecipeImage from './RecipeImage';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngel, faClock, faUserFriends } from '@fortawesome/pro-solid-svg-icons';
import './RecipeCard.css';

const RecipeCard = (props) => {
    const { recipe } = props;
    console.log(recipe);
    const recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();

    return (
        <Link to={`/recipes/${recipeUrlName}`}>
            <div className="recipeCard" >
                <RecipeImage image={recipe.image}/>
                <h2>{recipe.name}</h2>
                <div className="iconContainer">
                    <FontAwesomeIcon icon={faAngel} />
                    <p>{recipe.syns} {recipe.syns === 1 ? "syn" : "syns"}</p>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{`${recipe.cookingTime} mins`}</p>
                    <FontAwesomeIcon icon={faUserFriends} />
                    <p>{`${recipe.servings} servings`}</p>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard;