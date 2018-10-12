const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const key = require("../config/keys");

const authenticate = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, key.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

const vendorAuthentication = async (req, res, next) => {
  if (req.user.role === "vendor" || req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "You don't have permission" });
  }
};

module.exports = {
  authenticate,
  vendorAuthentication
};
