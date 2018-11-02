const express = require("express");
const users = require("../routes/userRoute");
const meals = require("../routes/mealRoute");
const posts = require("../routes/postRoute");
const vendors = require("../routes/vendorRoutes");
const shop = require("../routes/shoppingRoutes");
const { serverError, validationError } = require("../middleware/error");
const cors = require("../middleware/cors");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors);
  app.use("/api/users", users);
  app.use("/api/meals", meals);
  app.use("/api/posts", posts);
  app.use("/api/vendors", vendors);
  app.use("/api/shop", shop);
  app.use(validationError);
  app.use(serverError);
};
