const mongoose = require("mongoose");

const { Meal } = require("../models/mealModel");

const getMeals = async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });

  let meal = await Meal.find({ vendor: req.params.id }).select(
    "id name category cost"
  );

  res.status(200).json(meal);
};

module.exports = {
  getMeals
};
