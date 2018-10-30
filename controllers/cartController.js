const mongoose = require("mongoose");

const { Cart } = require("../models/cartModel");
const nodemailer = require("../helpers/nodemailer");

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

const getCarts = async (req, res) => {
  const cart = await Cart.find({ user: req.user._id })
    .limit(10)
    .sort("-createdAt")
    .populate({
      path: "meal",
      select: "name category cost city vendor",
      populate: {
        path: "vendor",
        select: "name email"
      }
    });

  res.status(200).json(cart);
};

const removeCart = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let cart = await Cart.findById(req.params.id);

  if (!cart) return res.status(404).json({ response: "Not found" });

  if (cart.user.toString() !== req.user._id) {
    return res
      .status(403)
      .json({ error: "You don't have permission to do that" });
  }

  await cart.remove();

  res.status(200).json(cart);
};

const bookMeal = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let meal = await Cart.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    {
      $set: {
        status: "pending"
      }
    },
    {
      new: true
    }
  ).populate({
    path: "meal",
    select: "name cost vendor",
    populate: {
      path: "vendor",
      select: "email"
    }
  });

  if (!meal) return res.status(404).json({ response: "Not found" });

  res.status(200).json({
    message:
      "You meal has been successfully booked. We have notified the vendor",
    note:
      "Your order is currently pending until the venor has accepted the request",
    response: meal
  });

  nodemailer(meal.meal.vendor.email);
};

module.exports = {
  createCart,
  getCarts,
  removeCart,
  bookMeal
};
