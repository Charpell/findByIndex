const app = require("./app");

const keys = require("./config/keys");

const port = process.env.PORT || keys.port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
