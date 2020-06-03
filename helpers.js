const fs = require("fs");
const optimise = require("./services/imageOptimise");

module.exports = {
  prettify: function prettify(str) {
    return str.replace(/(-|^)([^-]?)/g, function (_, prep, letter) {
      return (prep && " ") + letter.toUpperCase();
    });
  },

  prepareImage: async function prepareImage(image) {
    // Get the image file from the incoming request (with the help of Multer)
    let _image = fs.readFileSync(image.path);

    return {
      data: await optimise(_image), // Optimise the image to reduce filesize before saving it to the db
      contentType: "image/jpeg",
    };
  },

  prepareRecipeProps: async function prepareRecipeProps(image, props) {
    // Only need to do this stuff if the user has added an image file to the recipe
    const _image = image ? await module.exports.prepareImage(image) : null;

    const {
      name,
      rating,
      cookingTime,
      servings,
      description,
      syns,
      ingredients,
      method,
    } = props;

    // ingredients and method are JSON arrays of objects. Need to be parsed before adding to the database
    const _ingredients = JSON.parse(ingredients);
    const _method = JSON.parse(method);

    return {
      name,
      rating,
      cookingTime,
      servings,
      description,
      syns,
      ingredients: _ingredients,
      method: _method,
      image: _image,
    };
  },
};
