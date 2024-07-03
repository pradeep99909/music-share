const express = require("express");
const app = express.Router();

const appRoutes = require("./app.route");
const artistRoutes = require("./artist.routes");

app.use("/user", appRoutes);
app.use("/artist", artistRoutes);

module.exports = app;
