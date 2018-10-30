const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const { createCart } = require("../controllers/cartController");

router.post("/", authenticate, catchErrors(createCart));

module.exports = router;
