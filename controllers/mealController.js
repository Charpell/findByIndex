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

module.exports = {
  createMeal
};
