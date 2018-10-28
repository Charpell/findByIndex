require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "public");

const expressApp = express();
const app = http.createServer(expressApp);
const io = socketIO(app);

expressApp.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

require("./startup/routes")(expressApp);
require("./startup/db")();
require("./startup/config")();

module.exports = app;
