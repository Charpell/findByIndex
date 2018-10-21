const { Meal } = require("../models/mealModel");

const getMealsByLocation = async (req, res) => {
  const { longitude, latitude } = req.query;

  const meal = await Meal.geoNear(
    {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)]
    },
    { maxDistance: 2000000, spherical: true }
  );
  res.status(200).json(meal);
};

const getMealsByCostRange = async (req, res) => {
  const { minimum = 0, maximum = 20 } = req.query;

  const mealRange = await Meal.find({ cost: { $gte: minimum, $lte: maximum } })
    .sort("cost")
    .select("name cost");

  res.status(200).send(mealRange);
};

module.exports = {
  getMealsByLocation,
  getMealsByCostRange
};
