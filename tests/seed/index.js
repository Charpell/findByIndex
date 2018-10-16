const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();
const userThreeId = mongoose.Types.ObjectId();
const userfiveId = mongoose.Types.ObjectId();
const userfourId = mongoose.Types.ObjectId();
const mealOneId = mongoose.Types.ObjectId();
const mealTwoId = mongoose.Types.ObjectId();
const mealThreeId = mongoose.Types.ObjectId();
const postOneId = mongoose.Types.ObjectId();
const postTwoId = mongoose.Types.ObjectId();
const commentOneId = mongoose.Types.ObjectId();
const commentTwoId = mongoose.Types.ObjectId();
const likesIdOne = mongoose.Types.ObjectId();
const likesIdTwo = mongoose.Types.ObjectId();

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
    token: jwt.sign({ _id: userTwoId, role: "vendor" }, keys.jwtPrivateKey)
  },
  {
    _id: userThreeId,
    name: "Frank",
    email: "frankbyn@gmail.com",
    password: "123456",
    role: "vendor",
    token: jwt.sign({ _id: userThreeId, role: "vendor" }, keys.jwtPrivateKey)
  },
  {
    _id: userfiveId,
    name: "Derek",
    email: "derek@gmail.com",
    password: "123456",
    role: "user",
    token: jwt.sign({ _id: userfiveId, role: "vendor" }, keys.jwtPrivateKey)
  }
];

const meals = [
  {
    _id: mealOneId,
    name: "Fried Rice",
    category: "Rice",
    tags: ["salad", "sausage", "egg"],
    vendor: userTwoId
  },
  {
    _id: mealTwoId,
    name: "Beans",
    category: "beans",
    tags: ["moi-moi", "oats", "egg"],
    vendor: userThreeId
  }
];

const posts = [
  {
    _id: postOneId,
    name: "Kingsley",
    content: "The first content",
    user: userfiveId,
    likes: [
      {
        _id: likesIdOne,
        user: userfiveId
      }
    ],
    comments: [
      {
        _id: commentOneId,
        name: "Kingsley",
        content: "This is my comment",
        user: userfiveId
      }
    ]
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
