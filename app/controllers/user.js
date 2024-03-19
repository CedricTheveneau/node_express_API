const { User } = require("../models");
const bcrypt = require("bcrypt");
exports.signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      msg:
        err.message ||
        "Something wrong happened with your request to create a new user.",
    });
  }
  console.log(req.body);
  res.send("You are signup");
};

exports.login = (req, res) => {
  res.send("You are logged in");
};
