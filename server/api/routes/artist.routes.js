const express = require("express");
const app = express.Router();
const controllers = require("../controllers");

app.get("/top", controllers.artistController.topArtist);

module.exports = app;
