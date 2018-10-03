const express = require("express");
const config = require("config");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
