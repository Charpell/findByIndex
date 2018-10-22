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

  const { name, email, password, longitude = 3, latitude = 6 } = req.body;

  user = new User({
    name,
    email,
    password,
    geometry: { type: "Point", coordinates: [longitude, latitude] }
  });

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

const activateVendorMode = async (req, res) => {
  let user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        role: "vendor"
      }
    },
    { new: true }
  );
  if (!user) return res.status(404).send({ response: "User does not exist" });

  res.status(200).send({ response: "Vendor Mode Activated" });
};

module.exports = {
  createUser,
  loginUser,
  activateVendorMode
};
