const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/index");
const { catchErrors } = require("../helpers/errorhandlers");
const { getMeals } = require("../controllers/vendorController");

router.get("/:id", catchErrors(getMeals));

module.exports = router;
