const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal"
  },
  status: {
    type: String,
    default: "cart",
    enum: ["cart", "pending", "progress", "complete", "cancel"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  Cart
};
