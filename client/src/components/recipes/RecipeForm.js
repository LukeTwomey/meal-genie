import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import formFields from './formFields';
import IngredientInputs from "./IngredientInputs";
import { fetchRecipes } from '../../actions';
import MethodInputs from "./MethodInputs";
import './RecipeForm.css'

class RecipeForm extends Component {
    state = {
        name: '',
        rating: '',
        cookingTime: '',
        servings: '',
        description: '',
        syns: '',
        ingredients: [{ingredient: '', quantity: 0, unit: ''}],
        method: [{step: ''}],
        image: null,
        redirect: null
    }

    handleChange = e => {
        if (["ingredient", "quantity", "unit"].includes(e.target.className)) {
            let ingredients = [...this.state.ingredients]   
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ ingredients })
        } else if (["step"].includes(e.target.className)) {
            let method = [...this.state.method]   
            method[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ method })
        } else {
            const target = e.target;
            const value = target.value;
            const name = target.name;
            this.setState({ [name]: value });
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        // Need to submit post using multipart/form-data, as there is a File (image) included
        const formData = new FormData();

        // Loop through all form fields and add them to the formData which will be sent in the post request
        for (let field in this.state) {
            
            // handle case where data is an array (like ingredients or method)
            if(Array.isArray(this.state[field])){
                let data = JSON.stringify(this.state[field]);
                formData.set(field, data);
            } else {
                // Set formdata for all the other normal string fields (name, rating, description etc)
                formData.set( field, this.state[field])
            }
        }

        // Set up the config to tell axios that this is a multipart post request (text and image/file)
        const config = { headers: {'content-type': 'multipart/form-data'} }
        await axios.post('/api/recipes', formData, config);
        this.props.fetchRecipes();
        this.setState({ redirect: "/recipes" });
    }

    renderStaticFields = () => {
        return formFields.map(({ name, label, type }) => {
            return (
                <div className="formInput" key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input
                    id={name}
                    name={name}
                    type={type}
                    value={this.state[name]}
                    onChange={this.handleChange} />
                </div>
            );
        });
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
          ingredients: [...prevState.ingredients, {ingredient:'', quantity:0, unit:''}]
        }));
    }

    deleteIngredient = (e) => {
        e.preventDefault();
        const deletedIngredientIndex = e.target.dataset.id;
        this.setState((prevState) => ({
          ingredients: prevState.ingredients.filter((ingredient, i) => i !== parseInt(deletedIngredientIndex))
        }));
    }

    addStep = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
          method: [...prevState.method, {step:''}]
        }));
    }

    deleteStep = (e) => {
        e.preventDefault();
        const deletedStepIndex = e.target.dataset.id;
        this.setState((prevState) => ({
          method: prevState.method.filter((step, i) => i !== parseInt(deletedStepIndex))
        }));
    }

    addImage = () => {
        const fileInput = document.getElementById('imageUpload');
        const preview = document.getElementById('imagePreview');
        const files = fileInput.files;

        while(preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        if(files.length !== 0) {
            const image = document.createElement('img');
            image.src = window.URL.createObjectURL(files[0]);
            preview.appendChild(image);
            this.setState({ image: files[0] });
        }
    }

    render() {
        const {ingredients, method, redirect} = this.state
        if (redirect) {
            return <Redirect to={redirect} />
        }
        return (
            <div>
                <form className="addNewRecipeForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="imageUpload" id="imageUploadLabel">Add image</label>
                    <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png" onChange={this.addImage} />
                    <div id="imagePreview"></div>
                    {this.renderStaticFields()}
                    <label>Ingredients</label>
                    <div className="ingredients">
                        <IngredientInputs ingredients={ingredients} onChange={this.handleChange} deleteIngredient={this.deleteIngredient}/>
                    </div>
                    <button onClick={this.addIngredient} id="addIngredientButton">Add another ingredient</button>
                    <label>Method</label>
                    <div className="method">
                        <MethodInputs method={method} onChange={this.handleChange} deleteStep={this.deleteStep}/>
                    </div>
                    <button onClick={this.addStep} id="addStepButton">Add another step</button>
                    <input type="submit" value="Add recipe" className="submit"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes
    };
}

export default connect(
    mapStateToProps, 
    { fetchRecipes }
)(RecipeForm);