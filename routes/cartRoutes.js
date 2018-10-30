const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const { createCart, getCarts } = require("../controllers/cartController");

router.post("/", authenticate, catchErrors(createCart));
router.get("/", authenticate, catchErrors(getCarts));

module.exports = router;
