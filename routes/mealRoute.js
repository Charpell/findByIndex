const express = require("express");
const router = express.Router();

const { authenticate, vendorAuthentication } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createMeal,
  getMeals,
  getMeal,
  updateMeal
} = require("../controllers/mealController");

router.post("/", [authenticate, vendorAuthentication], catchErrors(createMeal));
router.get("/", catchErrors(getMeals));
router.get("/:id", catchErrors(getMeal));

router.patch(
  "/:id",
  [authenticate, vendorAuthentication],
  catchErrors(updateMeal)
);

module.exports = router;
