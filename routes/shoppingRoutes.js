const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createCart,
  getMealsInUserCart,
  removeCart,
  bookMeal
} = require("../controllers/shopUserController");

const { getAllBookedMeals } = require("../controllers/shopVendorController");

router.post("/", authenticate, catchErrors(createCart));
router.get("/", authenticate, catchErrors(getMealsInUserCart));
router.delete("/:id", authenticate, catchErrors(removeCart));
router.patch("/:id", authenticate, catchErrors(bookMeal));

router.get("/vendor", authenticate, catchErrors(getAllBookedMeals));

module.exports = router;
