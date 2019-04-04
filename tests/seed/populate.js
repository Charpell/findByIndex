const mongoose = require("mongoose");
const _ = require("lodash");
const faker = require("faker");

const NUMBERS_TO_ADD = 1000;

const rice = [
  "Coconut Rice",
  "Jollof rice",
  "fried rice",
  "Pate",
  "Tuwo Masara",
  "Tuwo Shinkafa",
  "White rice"
];
const sideDishes = ["Dodo", "Funkaso", "Mosa", "Salad", "Eggs"];
const beans = ["Akara", "Ewa Agoyin", "Gbegiri", "Moin moin", "Ekuru", "Okpa"];
const meat = ["Suya", "Tsire", "Kilishi", "Balangu", "Nkwobi"];
const soups = [
  "Banga soup",
  "Ofe akwu",
  "Ewedu",
  "Pepper soup",
  "Afang",
  "Okra Soup",
  "Rice stew",
  "Egusi",
  "Oha soup",
  "Oha soup"
];
const swallows = ["Amala", "Eba", "Fufu", "Pounded yam"];
const beverages = [
  "Kunu",
  "Palm wine",
  "Zobo",
  "Soya bean milk",
  "Coca-cola",
  "Fanta",
  "Beer"
];
const snacks = [
  "Chin Chin",
  "Puff Puff",
  "Akara",
  "Alkaki",
  "Kuli-Kuli",
  "Kokoro",
  "Meat pie",
  "Platain chips"
];
const tag = [
  "protein",
  "salad",
  "soup",
  "stew",
  "snacks",
  "beverage",
  "breakfast",
  "lunch",
  "dinner"
];

function generatorFunction(arr) {
  const firstIndex = Math.floor(Math.random() * arr.length);
  return arr[firstIndex];
}

function generateTags(arr) {
  let result;
  const firstIndex = Math.floor(Math.random() * arr.length);
  const secondIndex = Math.floor(Math.random() * arr.length);
  const thirdIndex = Math.floor(Math.random() * arr.length);
  if (firstIndex === secondIndex) {
    result = arr[firstIndex] + " " + arr[thirdIndex];
    return result.split(" ");
  }
  result = arr[firstIndex] + " " + arr[secondIndex];
  return result.split(" ");
}

function generateNumber(number) {
  return Math.floor(Math.random() * number) + 1;
}

function generateMeals() {
  return {
    name: generatorFunction(snacks),
    category: "Snacks",
    tags: generateTags(tag),
    image: faker.image.food(),
    vendor: mongoose.Types.ObjectId(),
    ratings: generateNumber(5),
    cost: faker.finance.amount(),
    description: faker.lorem.sentences(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    geometry: {
      type: "Point",
      coordinates: [Math.random() * 20, Math.random() * 40]
    },
    views: generateNumber(10000),
    clicks: generateNumber(1000),
    createdAt: faker.date.past()
  };
}

function generatePosts() {
  return {
    content: faker.lorem.sentence(),
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    user: mongoose.Types.ObjectId()
  };
}

const meals = _.times(NUMBERS_TO_ADD, () => generateMeals());
const posts = _.times(NUMBERS_TO_ADD, () => generatePosts());

module.exports = {
  posts,
  meals
};
