const mongoose = require("mongoose");

const checkObjectId = (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).json({ error: "Invalid ID" });
};

module.exports = {
  checkObjectId
};
