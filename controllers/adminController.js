const mongoose = require("mongoose");
const _ = require("lodash");

const { User } = require("../models/userModel");

const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" })
    .sort("name")
    .select({ name: 1, email: 1 });

  if (!users) return res.status(404).json({ response: "Not found" });

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const user = await User.findById(req.params.id)
    .sort("name")
    .select({ name: 1, email: 1 });
  if (!user) return res.status(404).send({ response: "User not found" });

  res.status(200).json(user);
};

const getVendors = async (req, res) => {
  const vendors = await User.find({ role: "vendor" })
    .sort("name")
    .select({ name: 1, email: 1 });

  if (!vendors) return res.status(404).json({ response: "Not found" });

  res.status(200).json(vendors);
};

const getVendor = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const vendor = await User.findById(req.params.id)
    .sort("name")
    .select({ name: 1, email: 1 });
  if (!vendor) return res.status(404).send({ response: "Vendor not found" });

  res.status(200).json(vendor);
};

module.exports = {
  getUsers,
  getUser,
  getVendors,
  getVendor
};
