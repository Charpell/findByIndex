const { Meal } = require("../models/mealModel");
const { isValid } = require("../helpers");

const getMeals = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  let meal = await Meal.find({ vendor: req.params.id }).select(
    "id name category cost"
  );

  res.status(200).json(meal);
};

module.exports = {
  getMeals
};
