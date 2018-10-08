const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const {
  User,
  validateUser,
  validateloginUser
} = require("../models/userModel");

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
};

const loginUser = async (req, res) => {
  const { error } = validateloginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = _.pick(req.body, ["email", "password"]);
  const user = await User.findByCredentials(body.email, body.password);

  const token = await user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
};

module.exports = {
  createUser,
  loginUser
};
