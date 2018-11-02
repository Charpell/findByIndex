const mongoose = require("mongoose");

const { Shopping } = require("../models/shoppingModel");
const nodemailer = require("../helpers/nodemailer");

const getAllBookedMeals = async (req, res) => {
  const mealItems = await Shopping.find({
    "vendor._id": req.user._id,
    status: "pending"
  })
    .limit(10)
    .sort("-createAt");

  if (!mealItems) return res.status(404).json({ response: "Not Found" });

  res.status(200).json(mealItems);
};

const vendorAcceptsBooking = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndUpdate(
    {
      _id: req.params.id,
      "vendor._id": req.user._id
    },
    {
      $set: {
        status: "progress"
      }
    },
    {
      new: true
    }
  );

  if (!item) return res.status(404).json({ response: "Not Found" });

  res.status(200).json({
    message:
      "You have accepted the booked meal. We will notify the customer that the meal is in progress",
    response: item
  });

  nodemailer(item.customer.email);
};

module.exports = {
  getAllBookedMeals,
  vendorAcceptsBooking
};
