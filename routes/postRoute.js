const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const { createPost } = require("../controllers/postController");

router.post("/", authenticate, catchErrors(createPost));

module.exports = router;
