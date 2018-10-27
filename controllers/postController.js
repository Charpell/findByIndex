const mongoose = require("mongoose");

const { Post, validateTextInput } = require("../models/postModel");

const createPost = async (req, res) => {
  const { error } = validateTextInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newPost = new Post({
    content: req.body.content,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user._id
  });

  const result = await newPost.save();
  res.status(201).json(result);
};

const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });

  if (!posts) res.status(404).send({ response: "No Post found" });

  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ response: "Not found" });
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { error } = validateTextInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const { content } = req.body;

  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ response: "Not found" });

  if (post.user.toString() !== req.user._id) {
    return res
      .status(403)
      .json({ error: "You don't have permission to do that!" });
  }

  await post
    .set({
      content
    })
    .save();

  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ response: "Not found" });

  if (post.user.toString() !== req.user._id) {
    return res
      .status(403)
      .json({ error: "You don't have permission to do that!" });
  }

  await post.remove();
  res.status(200).json(post);
};

const likePost = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ response: "Not found" });

  if (
    post.likes.filter(like => like.user.toString() === req.user._id).length > 0
  ) {
    const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user._id);

    post.likes.splice(removeIndex, 1);
    await post.save();

    return res.status(200).json({ response: "Unliked post" });
  }

  post.likes.unshift({ user: req.user._id });
  await post.save();
  res.status(200).json({ response: "Liked post" });
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost
};
