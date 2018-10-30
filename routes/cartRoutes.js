const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createCart,
  getCarts,
  removeCart,
  bookMeal
} = require("../controllers/cartController");

router.post("/", authenticate, catchErrors(createCart));
router.get("/", authenticate, catchErrors(getCarts));
router.delete("/:id", authenticate, catchErrors(removeCart));
router.patch("/:id", authenticate, catchErrors(bookMeal));

module.exports = router;
