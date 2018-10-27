const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware");
const { catchErrors } = require("../helpers/errorhandlers");

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  createComment
} = require("../controllers/postController");

router.post("/", authenticate, catchErrors(createPost));
router.get("/", catchErrors(getPosts));
router.get("/:id", catchErrors(getPost));
router.patch("/:id", authenticate, catchErrors(updatePost));
router.delete("/:id", authenticate, catchErrors(deletePost));

router.post("/like/:id", authenticate, catchErrors(likePost));

router.post("/comment/:id", authenticate, catchErrors(createComment));

module.exports = router;
