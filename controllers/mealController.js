const mongoose = require("mongoose");
const _ = require("lodash");

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

module.exports = {
  createMeal,
  getMeals,
  getMeal
};
