const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();
const userThreeId = mongoose.Types.ObjectId();
const userfourId = mongoose.Types.ObjectId();
const mealOneId = mongoose.Types.ObjectId();
const mealTwoId = mongoose.Types.ObjectId();
const mealThreeId = mongoose.Types.ObjectId();
const postOneId = mongoose.Types.ObjectId();
const postTwoId = mongoose.Types.ObjectId();

const users = [
  {
    _id: userOneId,
    name: "George",
    email: "george@gmail.com",
    password: "123456",
    token: jwt.sign({ _id: userOneId, role: "user" }, keys.jwtPrivateKey)
  },
  {
    _id: userTwoId,
    name: "Johnt",
    email: "johnkare@gmail.com",
    password: "123456",
    role: "vendor",
    geometry: {
      coordinates: [3, 6],
      _id: "5bce1c9dbcffa969eafe0acf",
      type: "Point"
    },
    token: jwt.sign(
      { _id: userTwoId, geometry: this.geometry, role: "vendor" },
      keys.jwtPrivateKey
    )
  },
  {
    _id: userThreeId,
    name: "Frank",
    email: "frankbyn@gmail.com",
    password: "123456",
    role: "vendor",
    token: jwt.sign({ _id: userThreeId, role: "vendor" }, keys.jwtPrivateKey)
  }
];

const meals = [
  {
    _id: mealOneId,
    name: "Fried Rice",
    category: "Rice",
    tags: ["salad", "sausage", "egg"],
    vendor: userTwoId,
    cost: 10
  },
  {
    _id: mealTwoId,
    name: "Beans",
    category: "beans",
    tags: ["moi-moi", "oats", "egg"],
    vendor: userThreeId,
    cost: 24
  }
];

const posts = [
  {
    _id: postOneId,
    name: "John",
    avatar: "avatar",
    user: userOneId
  },
  {
    _id: postOneId,
    content: "",
    name: "John",
    avatar: "avatar",
    user: userOneId
  },
  {
    _id: postTwoId,
    content: "This is the second post",
    name: "Elina",
    avatar: "avatar",
    user: userTwoId
  }
];

module.exports = {
  users,
  meals,
  mealOneId,
  mealTwoId,
  mealThreeId,
  userfourId,
  userOneId,
  posts
};
