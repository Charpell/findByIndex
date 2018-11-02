const express = require("express");
const router = express.Router();

const { authenticate, vendorAuthentication } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createCart,
  getMealsInUserCart,
  removeCart,
  bookMeal,
  cancelbookedMeal
} = require("../controllers/shopUserController");

const {
  getAllBookedMeals,
  vendorAcceptsBooking,
  vendorCompletesBooking,
  vendorCancelsBooking
} = require("../controllers/shopVendorController");

router.post("/", authenticate, catchErrors(createCart));
router.get("/", authenticate, catchErrors(getMealsInUserCart));
router.delete("/:id", authenticate, catchErrors(removeCart));
router.patch("/:id", authenticate, catchErrors(bookMeal));
router.patch("/cancel/:id", authenticate, catchErrors(cancelbookedMeal));

router.get(
  "/vendor",
  [authenticate, vendorAuthentication],
  catchErrors(getAllBookedMeals)
);
router.patch(
  "/vendor/:id",
  [authenticate, vendorAuthentication],
  catchErrors(vendorAcceptsBooking)
);
router.patch(
  "/vendor/complete/:id",
  [authenticate, vendorAuthentication],
  catchErrors(vendorCompletesBooking)
);

router.patch(
  "/vendor/cancel/:id",
  [authenticate, vendorAuthentication],
  catchErrors(vendorCancelsBooking)
);

module.exports = router;
