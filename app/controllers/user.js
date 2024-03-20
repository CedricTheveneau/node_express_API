const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new user.",
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchingPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log(process.env);
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: Number(process.env.TOKEN_EXPIRATION),
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({
      message: err.message || "An error accured during login.",
    });
  }
};
