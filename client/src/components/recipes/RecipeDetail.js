import React from 'react';

const RecipeDetail = (props) => {
    let recipeUrlName = props.match.params.name;
    
    // Find the recipe that matches the url name
    let recipe = props.recipes.find(o => {
        let recipeName = o.name.replace(/\s+/g, '-').toLowerCase();
        return recipeName === recipeUrlName ? true : false;
    });

    if (!recipe) {
        return <div><h1>Recipe Detail</h1><h2>Loading...</h2></div>;
    }

    return (
        <div>
            <h1>Recipe Detail</h1>
            <p>{recipe.name}</p>
            {/* <p>{recipe.image}</p> */}
            <p>Rating: {recipe.rating}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Syns: {recipe.syns}</p>
        </div>
    )
}

export default RecipeDetail;