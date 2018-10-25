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

module.exports = {
  createPost
};
