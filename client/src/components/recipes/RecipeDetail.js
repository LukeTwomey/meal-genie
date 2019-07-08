import React from 'react';
import { Link } from "react-router-dom";

const RecipeDetail = (props) => {
    let recipeUrlName = props.match.params.name;
    
    // Find the recipe that matches the url name
    let recipe = props.recipes.find(o => {
        let recipeName = o.name.replace(/\s+/g, '-').toLowerCase();
        return recipeName === recipeUrlName ? true : false;
    });

    if (!recipe) {
        return <div><h1>Recipe Detail</h1><h2>Loading...</h2></div>;
    } else {
        let ingredients = recipe.ingredients.map((ingredient, i) => { 
            return <li key={i}>{ingredient.quantity}{ingredient.unit} {ingredient.ingredient}</li> 
        })

        let method = recipe.method.map((method, i) => { 
            return <li key={i}>{method.step}</li> 
        })

        let recipeImageNeedToRefactorAllThis;
        if(recipe.image) {
            const base64Flag = 'data:image/jpeg;base64,';
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(recipe.image.data.data));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            const imageStr = window.btoa(binary);
            const image = base64Flag + imageStr;
            recipeImageNeedToRefactorAllThis = <img src={image} alt="Recipe" className='recipeImage'/>
        }

        return (
            <div>
                <h1>Recipe Detail</h1>
                <Link to="/recipes">View all recipes</Link><br/><br/>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                {recipeImageNeedToRefactorAllThis}
                <p>Rating: {recipe.rating}</p>
                <p>Cooking Time: {recipe.cookingTime}</p>
                <p>Servings: {recipe.servings}</p>
                <p>Syns: {recipe.syns}</p>
                <h3>Ingredients</h3>
                <ul>{ingredients}</ul>
                <h3>Method</h3>
                <ul>{method}</ul>
            </div>
        )
    }
}

export default RecipeDetail;