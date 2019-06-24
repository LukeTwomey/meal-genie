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
    method: Array
})

mongoose.model('recipe', recipeSchema);



