const express = require("express");
const router = express.Router();

const { catchErrors } = require("../helpers/errorhandlers");
const {
  createUser,
  loginUser,
  activateVendorMode
} = require("../controllers/userController");
const { authenticate } = require("../middleware");

router.post("/", catchErrors(createUser));
router.post("/login", catchErrors(loginUser));
router.patch("/vendor", authenticate, catchErrors(activateVendorMode));

module.exports = router;
