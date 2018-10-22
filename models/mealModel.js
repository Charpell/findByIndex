const Joi = require("joi");
const mongoose = require("mongoose");

const { GeoSchema } = require("./schemas");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      type: Number
    }
  ],
  geometry: GeoSchema
});

const Meal = mongoose.model("Meal", mealSchema);

function validateMeal(meal) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(15)
      .required(),
    category: Joi.string().required(),
    tags: Joi.array()
      .min(1)
      .required(),
    cost: Joi.number().required()
  };

  return Joi.validate(meal, schema);
}

module.exports = {
  Meal,
  validateMeal
};
