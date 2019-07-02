import React, { Component } from 'react';
import axios from 'axios';
import formFields from './formFields';
import './RecipeForm.css'

export default class RecipeForm extends Component {
    state = {
        name: '',
        rating: '',
        cookingTime: '',
        servings: '',
        description: '',
        syns: '',
        ingredients: ['meat'],
        method: ['cook it']
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = this.state;
        const res = await axios.post('/api/recipes', { name, rating, cookingTime, servings, description, syns, ingredients, method });
        console.log(res.data);
    }

    renderFields = () => {
        return formFields.map(({ name, label, type }) => {
            return (
                <label key={name}>
                    {label}
                    <input
                        name={name}
                        type={type}
                        value={this.state[name]}
                        onChange={this.handleInputChange} />
                </label>
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderFields()}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}