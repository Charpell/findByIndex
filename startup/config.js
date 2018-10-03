const keys = require("../config/keys");

module.exports = function() {
  if (!keys.jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
