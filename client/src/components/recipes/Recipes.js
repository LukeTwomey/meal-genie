import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Recipes.css'

export default class Recipes extends Component {

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    getRecipes() {
        const {recipes} = this.props;

        return recipes.reverse().map((recipe, i) => {
            let recipeImage = null;                
            
            if(recipe.image) {
                const base64Flag = 'data:image/jpeg;base64,';
                const imageStr = this.arrayBufferToBase64(recipe.image.data.data);
                const image = base64Flag + imageStr;
                recipeImage = <img src={image} alt="Recipe" className='recipeImage'/>
            }

            let recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();
            return <div key={i}><li><Link to={`/recipes/${recipeUrlName}`}>{recipe.name}</Link>{recipeImage}</li></div>;
        })
    }
    
    render() {
        return (
            <div>
                <h1>Recipes</h1>
                <ul>
                    {this.props.recipes.length !== 0 ? this.getRecipes() : null}
                </ul>
                <Link to="/recipes/new">Add new recipe</Link>
            </div>
        )
    }
}