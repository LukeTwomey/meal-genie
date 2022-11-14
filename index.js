const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/Recipe");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require("./routes/routes")(app);

if (process.env.NODE_ENV === "production") {
  console.log("node env is production");
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);
