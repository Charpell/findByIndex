const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const keys = require("../config/keys");
const { GeoSchema } = require("./schemas");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  avatar: {
    type: String
  },
  geometry: GeoSchema,
  role: {
    type: String,
    default: "user",
    enum: ["user", "vendor", "admin", "root"]
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      geometry: this.geometry,
      role: this.role
    },
    keys.jwtPrivateKey
  );
  return token;
};

userSchema.statics.findByCredentials = function(email, password) {
  return this.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject({
        status: 400,
        message: "Incorrect email or password"
      });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({
            status: 400,
            message: "Incorrect email or password"
          });
        }
      });
    });
  });
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    longitude: Joi.string(),
    latitude: Joi.string()
  };

  return Joi.validate(user, schema);
}

function validateloginUser(user) {
  const schema = {
    email: Joi.string()
      .min(1)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validateUser,
  validateloginUser
};
