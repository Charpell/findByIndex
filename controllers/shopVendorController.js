const mongoose = require("mongoose");

const { Shopping } = require("../models/shoppingModel");
const nodemailer = require("../helpers/nodemailer");

const getAllBookedMeals = async (req, res) => {
  const { status = "pending" } = req.query;

  if (status === "cart" && req.user.role === "vendor")
    res.status(403).send("Forbidden");

  const mealItems = await Shopping.find({
    "vendor._id": req.user._id,
    status
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

  const customerMessage = `We will notify the customer that you have accepted ${
    item.meal.name
  } order`;
  nodemailer(item.customer.email, customerMessage);
};

const vendorCompletesBooking = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndUpdate(
    {
      _id: req.params.id,
      "vendor._id": req.user._id
    },
    {
      $set: {
        status: "complete"
      }
    },
    {
      new: true
    }
  );

  if (!item) return res.status(404).json({ response: "Not Found" });

  res.status(200).json({
    message: "Meal completed",
    response: item
  });

  const customerMessage = `We will notify the customer that you have completed ${
    item.meal.name
  } order`;
  nodemailer(item.customer.email, customerMessage);
};

const vendorCancelsBooking = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndUpdate(
    {
      _id: req.params.id,
      "vendor._id": req.user._id
    },
    {
      $set: {
        status: "cancel"
      }
    },
    {
      new: true
    }
  );

  if (!item) return res.status(404).json({ response: "Not Found" });

  res.status(200).json({
    message: "You have cancelled the booked meal. We will notify the customer",
    response: item
  });

  const customerMessage = `We will notify the customer that you have cancelled the ${
    item.meal.name
  } order`;
  nodemailer(item.customer.email, customerMessage);
};

module.exports = {
  getAllBookedMeals,
  vendorAcceptsBooking,
  vendorCompletesBooking,
  vendorCancelsBooking
};
