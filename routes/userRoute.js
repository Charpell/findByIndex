const express = require("express");
const router = express.Router();

const { catchErrors } = require("../helpers/errorhandlers");
const { createUser, login } = require("../controllers/userController");

router.post("/", catchErrors(createUser));
router.post("/login", catchErrors(login));

module.exports = router;
