const { Wood } = require("../models");
exports.list = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve the essences of wood.",
    });
  }
};

exports.readByHardness = async (req, res) => {
  try {
    const hardness = req.params.hardness;
    const woods = await Wood.findAll({
      where: {
        hardness: hardness,
      },
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve the essences of wood based on the hardness you picked.",
    });
  }
};
