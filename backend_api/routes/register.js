const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

const registerRoute = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All inputs are required");
    }
    //check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists. Please login");
    }
    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user in database
    const newUser = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    //create token
    const token = jwt.sign(
      { newUser_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    newUser.token = token;

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
  }
};

module.exports = registerRoute;
