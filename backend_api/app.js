const path = require("path");
const express = require("express");
const cors = require("cors");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

require("dotenv").config();
require("./config/database").connect();

const app = express();

const corsOptions = {
  origin: "https://checkout-v3-ui-prod.f4b-flutterwave.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digital wallet API");
});

app.get("/pay", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/register", registerRoute);
app.post("/login", loginRoute);

module.exports = app;
