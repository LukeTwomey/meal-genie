const mongoose = require("mongoose");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const Recipe = mongoose.model("recipe");
const helpers = require("../helpers.js");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  region: "eu-west-2",
});

module.exports = (app) => {
  // Contact Amazon S3 to get a signed url which the client can upload a recipe image with
  app.post("/api/upload", (req, res) => {
    const key = req.body.imageFilename;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "meal-genie",
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });

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
    res.send(newRecipe);
  });

  // Edit specific recipe, based on recipe name
  app.put("/api/recipes/:name", async (req, res) => {
    const recipe = await Recipe.findOneAndUpdate(
      { name: helpers.prettify(req.params.name) },
      req.body,
      { new: true }
    );
    res.send(recipe);
  });

  // Delete recipe from the database
  app.delete("/api/recipes/:id", async (req, res) => {
    console.log("Delete recipe with this id: " + req.params.id);
  });

  // Add a new recipe to the database
  app.post("/api/recipes", async (req, res) => {
    const recipe = await new Recipe(req.body).save();
    res.send(recipe);
  });
};
