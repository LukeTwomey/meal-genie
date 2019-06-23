const mongoose = require('mongoose');
const { Schema } = mongoose; 

const recipeSchema = new Schema({
    name: String,
    rating: Number,
    cookingTime: Number,
    servings: Number,
    description: String,
    syns: Number,
    ingredients: Array,
    method: Array,
    nutrition: Array
})

mongoose.model('recipe', recipeSchema);



