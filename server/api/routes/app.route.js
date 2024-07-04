const express = require("express");
const app = express.Router();

const controllers = require("../controllers");

app.get("/login", controllers.appController.userLogin);

app.get("/callback", controllers.appController.userCallback);

app.get("/share", controllers.appController.userShare);

module.exports = app;
