const express = require("express");
const router = express.Router();

const { catchErrors } = require("../helpers/errorhandlers");
const { createUser, loginUser } = require("../controllers/userController");

router.post("/", catchErrors(createUser));
router.post("/login", catchErrors(loginUser));

module.exports = router;
