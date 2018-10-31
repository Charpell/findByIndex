const mongoose = require("mongoose");

const { Shopping } = require("../models/shoppingModel");
const { Meal } = require("../models/mealModel");
const nodemailer = require("../helpers/nodemailer");

const createCart = async (req, res) => {
  const { _id, name, email } = req.user;
  const { meal } = req.body;

  const isValid = mongoose.Types.ObjectId.isValid(meal);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const result = await Meal.findById(meal).populate("vendor", "name email");

  let newItem = new Shopping({
    customer: {
      _id,
      name,
      email
    },
    meal: {
      _id: result._id,
      name: result.name,
      cost: result.cost
    },
    vendor: {
      _id: result.vendor._id,
      name: result.vendor.name,
      email: result.vendor.email
    }
  });

  newItem.save();
  res.status(201).json(newItem);
};

const getMealsInUserCart = async (req, res) => {
  const mealItems = await Shopping.find({
    "customer._id": req.user._id,
    status: "cart"
  })
    .limit(10)
    .sort("-createdAt");

  res.status(200).json(mealItems);
};

const removeCart = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndRemove({
    _id: req.params.id,
    "customer._id": req.user._id
  });

  if (!item) return res.status(404).json({ response: "Not found" });

  res.status(200).json(item);
};

const bookMeal = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndUpdate(
    { _id: req.params.id, "customer._id": req.user._id },
    {
      $set: {
        status: "pending"
      }
    },
    {
      new: true
    }
  );

  if (!item) return res.status(404).json({ response: "Not found" });

  res.status(200).json({
    message:
      "You meal has been successfully booked. We have notified the vendor",
    note:
      "Your order is currently pending until the venor has accepted the request",
    response: item
  });

  nodemailer(item.vendor.email);
};

module.exports = {
  createCart,
  getMealsInUserCart,
  removeCart,
  bookMeal
};
