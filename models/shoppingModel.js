const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
      }
    }),
    required: true
  },
  meal: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }),
    required: true
  },
  vendor: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }),
    required: true
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

const Shopping = mongoose.model("Shopping", shoppingSchema);

module.exports = {
  Shopping
};
