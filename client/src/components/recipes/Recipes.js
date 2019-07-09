import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RecipeImage from './RecipeImage';

export default class Recipes extends Component {

    getRecipes() {
        const {recipes} = this.props;

        return recipes.map((recipe, i) => {
            let recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();
            return (
                <div key={i}>
                    <li>
                        <Link to={`/recipes/${recipeUrlName}`}>{recipe.name}</Link>
                        <RecipeImage image={recipe.image}/>
                    </li>
                </div>
            ) 
        })
    }
    
    render() {
        const  { recipes } = this.props;

        return (
            <div>
                <h1>Recipes</h1>
                <ul>
                    {recipes.length !== 0 ? this.getRecipes() : null}
                </ul>
                <Link to="/recipes/new">Add new recipe</Link>
            </div>
        )
    }
}