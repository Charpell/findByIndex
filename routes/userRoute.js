const express = require("express");
const router = express.Router();
const passport = require("passport");

const { catchErrors } = require("../helpers/errorhandlers");
const {
  createUser,
  loginUser,
  google,
  activateVendorMode
} = require("../controllers/userController");
const { authenticate } = require("../middleware");

router.post("/", catchErrors(createUser));
router.post("/login", catchErrors(loginUser));
router.get("/google", google);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", (req, res) => {
    console.log("Success");
  })
);
router.patch("/vendor", authenticate, catchErrors(activateVendorMode));

module.exports = router;
