const express = require("express");
const users = require("../routes/userRoute");
const meals = require("../routes/mealRoute");
const posts = require("../routes/postRoute");
const { serverError, validationError } = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/meals", meals);
  app.use("/api/posts", posts);
  app.use(validationError);
  app.use(serverError);
};
