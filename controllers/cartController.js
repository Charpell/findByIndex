const mongoose = require("mongoose");

const { Cart } = require("../models/cartModel");

const createCart = async (req, res) => {
  const { _id: user } = req.user;
  const { meal } = req.body;

  const isValid = mongoose.Types.ObjectId.isValid(meal);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let newCart = new Cart({
    user,
    meal
  });

  const result = await newCart.save();
  res.status(201).json(result);
};

module.exports = {
  createCart
};
