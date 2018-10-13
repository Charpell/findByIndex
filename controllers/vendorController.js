const mongoose = require("mongoose");
const _ = require("lodash");

const { Meal } = require("../models/mealModel");

const getMeals = async (req, res) => {
  checkObjectId(req, res);

  let meal = await Meal.find({ vendor: req.params.id });

  res.status(200).send(meal);
};

module.exports = {
  getMeals
};
