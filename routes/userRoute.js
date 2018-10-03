const express = require("express");
const router = express.Router();

const { catchErrors } = require("../helpers/errorhandlers");
const { createUser } = require("../controllers/userController");

router.post("/", catchErrors(createUser));

module.exports = router;
