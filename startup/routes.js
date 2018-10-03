const express = require("express");
const users = require("../routes/userRoute");
const { serverError, validationError } = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use(validationError);
  app.use(serverError);
};
