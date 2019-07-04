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
        console.log(this.props.recipes);

        if(this.props.recipes.length !== 0) {

            return this.props.recipes.map((recipe, i) => {

                let theImageIfItExists = null;                
                
                if(recipe.image) {
                    console.log("ummm");
                    console.log(recipe);
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = this.arrayBufferToBase64(recipe.image.data.data);
                    const image = base64Flag + imageStr;
                    theImageIfItExists = <img src={image} alt="whatever"/>
                } else {
                    // just leave it as it is 
                }

                return <div key={i}><li>{recipe.name}<br/><br/>{theImageIfItExists}</li><br/></div>;
                
            })
        } else {
            return null;
        }
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