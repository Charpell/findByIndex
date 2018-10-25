const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createPost,
  getPosts,
  getPost,
  updatePost
} = require("../controllers/postController");

router.post("/", authenticate, catchErrors(createPost));
router.get("/", catchErrors(getPosts));
router.get("/:id", catchErrors(getPost));
router.patch("/:id", authenticate, catchErrors(updatePost));

module.exports = router;
