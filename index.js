require("dotenv").config();
const express = require("express");

const keys = require("./config/keys");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || keys.port;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
