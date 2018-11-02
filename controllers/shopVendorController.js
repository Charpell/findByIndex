const { Shopping } = require("../models/shoppingModel");

const getAllBookedMeals = async (req, res) => {
  const mealItems = await Shopping.find({
    "vendor._id": req.user._id,
    status: "pending"
  })
    .limit(10)
    .sort("-createAt");

  if (!mealItems) return res.status(404).json({ response: "Not Found" });

  res.status(200).json(mealItems);
};

module.exports = {
  getAllBookedMeals
};
