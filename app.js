const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello World");
}); //gh

module.exports = app;
