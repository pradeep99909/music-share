const express = require("express");
const app = express.Router();

const controllers = require("../controllers");

app.get("/login", controllers.appController.userLogin);

app.get("/callback", controllers.appController.userCallback);

module.exports = app;
