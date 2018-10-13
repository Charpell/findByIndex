const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/index");
const { catchErrors } = require("../helpers/errorhandlers");
const {
  getUsers,
  getUser,
  getVendors,
  getVendor
} = require("../controllers/adminController");

router.get("/users", catchErrors(getUsers));
router.get("/users/:id", catchErrors(getUser));
router.get("/vendors", catchErrors(getVendors));
router.get("/vendors/:id", catchErrors(getVendor));

module.exports = router;
