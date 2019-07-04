const mongoose = require('mongoose');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const Recipe = mongoose.model('recipe');

module.exports = app => {

    // Get all recipes from the database
    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find();
        res.send(recipes);
    })

    // Add a new recipe to the database. Use Multer middleware to handle multipart form data (used for image)
    app.post('/api/recipes', upload.single('image'), async (req, res) => {
        const image = {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/jpeg'
        }

        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = req.body;

        const _recipe = await new Recipe({ name, rating, cookingTime, servings, description, syns, ingredients, method, image
        }).save();
        
        res.send(_recipe);
    })
}