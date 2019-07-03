import React, { Component } from 'react';
import axios from 'axios';
import formFields from './formFields';
import IngredientInputs from "./IngredientInputs"
import MethodInputs from "./MethodInputs"
import './RecipeForm.css'

export default class RecipeForm extends Component {
    state = {
        name: '',
        rating: '',
        cookingTime: '',
        servings: '',
        description: '',
        syns: '',
        ingredients: [{ingredient: '', quantity: '', unit: ''}],
        method: [{step: ''}]
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
        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = this.state;
        const res = await axios.post('/api/recipes', { name, rating, cookingTime, servings, description, syns, ingredients, method });
        console.log(res.data);

        // Image stuff

    }

    renderStaticFields = () => {
        return formFields.map(({ name, label, type }) => {
            return (
                <label key={name}>
                    {label}
                    <input
                        name={name}
                        type={type}
                        value={this.state[name]}
                        onChange={this.handleChange} />
                </label>
            );
        });
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
          ingredients: [...prevState.ingredients, {ingredient:'', quantity:'', unit:''}]
        }));
    }

    addStep = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
          method: [...prevState.method, {step:''}]
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
        }
    }

    render() {
        const {ingredients, method} = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="imageUpload" id="imageUploadLabel">Add Image</label>
                    <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png" onChange={this.addImage} />
                    <div id="imagePreview"></div>
                    {this.renderStaticFields()}
                    <button onClick={this.addIngredient}>Add new ingredient</button>
                    <IngredientInputs ingredients={ingredients} onChange={this.handleChange}/>
                    <button onClick={this.addStep}>Add step</button>
                    <MethodInputs method={method} onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}