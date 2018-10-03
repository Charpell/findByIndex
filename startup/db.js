const mongoose = require("mongoose");

const keys = require("../config/keys");

module.exports = function() {
  mongoose
    .connect(keys.mongoURI)
    .then(() => console.log("MongoDb is now connected...."))
    .catch(error => console.log("MongoDb not connected", error.message));
};
