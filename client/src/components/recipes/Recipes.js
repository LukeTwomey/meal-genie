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
        return this.props.recipes.map((recipe, i) => {
            const base64Flag = 'data:image/jpeg;base64,';
            const imageStr = this.arrayBufferToBase64(recipe.image.data.data);
            const image = base64Flag + imageStr;

            return <div key={i}><li>{recipe.name}<br/><br/><img src={image}/></li><br/></div>;
        })
    }
    
    render() {
        return (
            <div>
                <h1>Recipes</h1>
                <ul>
                    {this.getRecipes()}
                </ul>
                <Link to="/recipes/new">Add new recipe</Link>
            </div>
        )
    }
}