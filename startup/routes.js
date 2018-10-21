const express = require("express");
const users = require("../routes/userRoute");
const meals = require("../routes/mealRoutes");
const vendors = require("../routes/vendorRoutes");
const admin = require("../routes/adminRoutes");
const posts = require("../routes/postRoutes");
const search = require("../routes/searchRoutes");
const { serverError, validationError } = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/meals", meals);
  app.use("/api/vendors", vendors);
  app.use("/api/admin", admin);
  app.use("/api/posts", posts);
  app.use("/api/search", search);
  app.use(validationError);
  app.use(serverError);
};
