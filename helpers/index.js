const mongoose = require("mongoose");

const isValid = id => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  isValid
};
