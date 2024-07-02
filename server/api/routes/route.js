const express = require("express");
const app = express.Router();

const appRoutes = require("./app.route");

app.use("/user", appRoutes);

module.exports = app;
