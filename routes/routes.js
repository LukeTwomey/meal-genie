const mongoose = require('mongoose');
const fs = require('fs');
const optimise = require('../services/imageOptimise');
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
        let image = null;

        // Only need to do this stuff if the user has added an image file to the recipe
        if(req.file) {
            // Get the image file from the incoming request (with the help of Multer)
            image = fs.readFileSync(req.file.path);

            image = {
                data: await optimise(image), // Optimise the image to reduce filesize before saving it to the db
                contentType: 'image/jpeg'
            }
        }

        const { name, rating, cookingTime, servings, description, syns, ingredients, method } = req.body;

        // Save the recipe to the db
        const _recipe = await new Recipe({ name, rating, cookingTime, servings, description, syns, ingredients, method, image
        }).save();
        
        res.send(_recipe);
    })
}