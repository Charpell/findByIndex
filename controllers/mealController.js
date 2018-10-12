const mongoose = require("mongoose");
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Meal, validateMeal } = require("../models/mealModel");

const createMeal = async (req, res) => {
  const { error } = validateMeal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, category, tags } = req.body;
  let meal = new Meal({
    name,
    category,
    tags,
    vendor: req.user._id
  });
  const result = await meal.save();
  res.status(201).json(result);
};

const getMeals = async (req, res) => {
  const meals = await Meal.find()
    .sort("name")
    .populate("vendor", "name role")
    .select("name");
  res.status(200).json(meals);
};

const getMeal = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });
  res.status(200).json(meal);
};

const updateMeal = async (req, res) => {
  const { error } = validateMeal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  const { name, category, tags } = req.body;

  let meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });

  if (meal.vendor.toString() === req.user._id || req.user.role === "admin") {
    await meal
      .set({
        name,
        category,
        tags
      })
      .save();

    return res.status(200).json(meal);
  }

  res.status(403).json({ error: "You don't have permission to do that!" });
};

const deleteMeal = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });

  if (meal.vendor.toString() === req.user._id || req.user.role === "admin") {
    await meal.remove();
    return res.status(200).json(meal);
  }

  res.status(403).json({ error: "You don't have permission to do that!" });
};

const getOwnerMeals = async (req, res) => {
  const meal = await Meal.find({ owner: "5bbee78abd64d610d033dcfa" });

  res.send(meal);
};

module.exports = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
  getOwnerMeals
};
