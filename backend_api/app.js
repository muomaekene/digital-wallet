require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

const app = express();

app.use(express.json());

app.post("/register", registerRoute);
app.post("/login", loginRoute);

// Logic here

module.exports = app;
