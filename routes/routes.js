const mongoose = require("mongoose");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Recipe = mongoose.model("recipe");
const helpers = require("../helpers.js");
const sharp = require("sharp");
const AWS = require("aws-sdk");

module.exports = (app) => {
  app.post("/api/shareMealPlan", async (req, res) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.gmailUser,
        pass: keys.gmailPassword,
      },
    });

    let emailContent = "<ul>";
    for (const meal of req.body.mealPlan) {
      emailContent += `<li>${meal.day} - ${meal.recipe}</li>`;
    }
    emailContent += "</ul>";

    let mailOptions = {
      from: keys.gmailUser,
      to: req.body.emailAddress,
      subject: "Meal Genie - Mealplan",
      html: emailContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

  // Get all recipes from the database
  app.get("/api/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
  });

  // Fetch single recipe from the database
  app.get("/api/recipes/:name", async (req, res) => {
    const recipe = await Recipe.findOne({
      name: helpers.prettify(req.params.name),
    });
    console.log(recipe);
    console.log(recipe.image.data);
    const imageAsFile = await sharp(recipe.image.data).toFile("hey.jpg");
    console.log(imageAsFile);
    const newRecipe = { ...recipe._doc, imageAsFile: imageAsFile };
    console.log(newRecipe);
    console.log("Changing something once more");
    res.send(newRecipe);
  });

  // Edit specific recipe
  app.put("/api/recipes/:name", upload.single("image"), async (req, res) => {
    console.log(req.file);
    const props = await helpers.prepareRecipeProps(req.file, req.body);
    const recipe = await Recipe.findOneAndUpdate(
      { name: helpers.prettify(req.params.name) },
      props,
      { new: true }
    );
    res.send(recipe);
  });

  // Delete recipe from the database
  app.delete("/api/recipes/:id", async (req, res) => {
    console.log("Delete recipe with this id: " + req.params.id);
  });

  // Add a new recipe to the database. Use Multer middleware to handle multipart form data (used for image)
  app.post("/api/recipes", upload.single("image"), async (req, res) => {
    const props = await helpers.prepareRecipeProps(req.file, req.body);
    const _recipe = await new Recipe(props).save();
    res.send(_recipe);
  });
};
