const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');

module.exports = app => {

    // Get all recipes from the database
    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find();
        res.send(recipes);
    })

    // Add a new recipe to the database
    app.post('/api/recipes', async (req, res) => {
        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = req.body;
        const _recipe = await new Recipe({ name, rating, cookingTime, servings, description, syns, ingredients, method
        }).save();
        res.send(_recipe);
    })
}