const { Wood } = require("../models");
exports.list = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    res.status(201).json(woods);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve the essences of wood.",
    });
  }
};
