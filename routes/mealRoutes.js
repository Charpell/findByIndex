const express = require("express");
const router = express.Router();

const { authenticate, vendorAuthentication } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");
const {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
  getOwnerMeals
} = require("../controllers/mealController");

router.get("/", [authenticate, vendorAuthentication], catchErrors(getMeals));
router.get("/:id", catchErrors(getMeal));
router.post("/", authenticate, catchErrors(createMeal));
router.patch("/:id", authenticate, catchErrors(updateMeal));
router.delete("/:id", authenticate, catchErrors(deleteMeal));

router.get("/owner", catchErrors(getOwnerMeals));

module.exports = router;
