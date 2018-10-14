const express = require("express");
const router = express.Router();

const { authenticate, vendorAuthentication } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const { createMeal } = require("../controllers/mealController");

router.post("/", [authenticate, vendorAuthentication], catchErrors(createMeal));

module.exports = router;
