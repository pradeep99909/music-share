const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./api/routes/route");

app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);

app.listen(8080, () => console.log("[App] running on Port 8080!"));
