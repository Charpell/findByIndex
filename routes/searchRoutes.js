const express = require("express");
const router = express.Router();

const { catchErrors } = require("../helpers/errorhandlers");

const {
  getMealsByLocation,
  getMealsByCostRange
} = require("../controllers/searchController");

router.get("/location", catchErrors(getMealsByLocation));
router.get("/cost", catchErrors(getMealsByCostRange));

module.exports = router;
