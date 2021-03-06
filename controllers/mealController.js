const { Meal, validateMeal } = require("../models/mealModel");
const { isValid } = require("../helpers");

const createMeal = async (req, res) => {
  const { error } = validateMeal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { coordinates } = req.user.geometry;

  const { name, category, tags, cost } = req.body;
  let meal = new Meal({
    name,
    category,
    tags,
    cost,
    geometry: { type: "Point", coordinates: [coordinates[0], coordinates[1]] },
    vendor: req.user._id
  });
  const result = await meal.save();
  res.status(201).json(result);
};

const getMeals = async (req, res) => {
  const meals = await Meal.find()
    .sort("cost")
    .limit(100)
    .populate("vendor", "id name role")
    .select("name category cost");
  res.status(200).json(meals);
};

const getMeal = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  const meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });
  res.status(200).json(meal);
};

const updateMeal = async (req, res) => {
  const { error } = validateMeal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  const { name, category, tags } = req.body;

  let meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });

  if (meal.vendor.toString() !== req.user._id) {
    return res
      .status(403)
      .json({ error: "You don't have permission to do that!" });
  }
  await meal
    .set({
      name,
      category,
      tags
    })
    .save();

  res.status(200).json(meal);
};

const deleteMeal = async (req, res) => {
  if (!isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  let meal = await Meal.findById(req.params.id);
  if (!meal) return res.status(404).json({ response: "Not found" });

  if (meal.vendor.toString() !== req.user._id) {
    return res
      .status(403)
      .json({ error: "You don't have permission to do that!" });
  }

  await meal.remove();
  res.status(200).json(meal);
};

module.exports = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal
};
