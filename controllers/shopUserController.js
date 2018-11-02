const { Shopping } = require("../models/shoppingModel");
const { Meal } = require("../models/mealModel");
const nodemailer = require("../helpers/nodemailer");
const { isValid } = require("../helpers");

const createCart = async (req, res) => {
  const { _id, name, email } = req.user;
  const { meal } = req.body;

  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

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
  const { status = "cart" } = req.query;

  const mealItems = await Shopping.find({
    "customer._id": req.user._id,
    status
  })
    .limit(10)
    .sort("-createdAt");

  res.status(200).json(mealItems);
};

const removeCart = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  let item = await Shopping.findOneAndRemove({
    _id: req.params.id,
    "customer._id": req.user._id
  });

  if (!item) return res.status(404).json({ response: "Not found" });

  res.status(200).json(item);
};

const bookMeal = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

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

  const vendorMessage = `${item.customer.name} has booked ${item.meal.name}`;

  res.status(200).json({
    message:
      "You meal has been successfully booked. We have notified the vendor",
    note:
      "Your order is currently pending until the venor has accepted the request",
    response: item
  });

  nodemailer(item.vendor.email, vendorMessage);
};

const cancelbookedMeal = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  let meal = await Shopping.findById(req.params.id);

  if (meal.status === "cart" || meal.status === "complete")
    return res.status(403).send("Forbidden");

  if (meal.status === "progress") {
    res.status(200).json({
      message:
        "We will notify the vendor of your intention to cancel the order",
      note: "Awaiting response from the vendor",
      response: meal
    });

    const vendorMessage = `${meal.customer.name} wants to cancel ${
      meal.meal.name
    } order`;
    nodemailer(meal.vendor.email, vendorMessage);
    return;
  }

  let item = await Shopping.findOneAndUpdate(
    { _id: req.params.id, "customer._id": req.user._id },
    {
      $set: {
        status: "cancel"
      }
    },
    {
      new: true
    }
  );

  if (!item) return res.status(404).json({ response: "Not found" });

  res.status(200).json({
    message:
      "You meal has been successfully canceled. We will notify the vendor",
    response: item
  });
};

module.exports = {
  createCart,
  getMealsInUserCart,
  removeCart,
  bookMeal,
  cancelbookedMeal
};
