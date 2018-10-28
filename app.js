require("dotenv").config();
const express = require("express");
const http = require("http");

const expressApp = express();
const app = http.createServer(expressApp);

require("./startup/routes")(expressApp);
require("./startup/db")();
require("./startup/config")();
require("./chat")(app);

module.exports = app;
