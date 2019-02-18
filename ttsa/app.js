const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// set up our express application
const app = express();
app.use(logger("dev")); // log every request to the console
app.use(bodyParser.json()); // get information from requests
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require("./src/routes")(app);

module.exports = app;
