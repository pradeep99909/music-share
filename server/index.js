const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).send("Working");
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(8080, () => console.log("[App] running on Port 8080!"));
