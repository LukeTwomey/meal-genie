const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');

module.exports = app => {

    app.post('/api/recipes', async (req, res) => {
        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = req.body;
        const _recipe = await new Recipe({ name, rating, cookingTime, servings, description, syns, ingredients, method
        }).save();
        res.send(_recipe);
    })
}