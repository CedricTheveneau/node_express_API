const { Wood } = require("../models");
const fs = require("fs");
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

exports.create = async (req, res) => {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const woodDatas = {
      ...JSON.parse(req.body.datas),
      image: pathname,
    };
    const wood = await Wood.create(woodDatas);
    res.status(201).json(wood);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new wood.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const oldWoodDatas = JSON.parse(req.body.datas);
    // New img
    // const pathname = `${req.protocol}://${req.get("host")}/uploads/${
    //   req.file.filename
    // }`;
    const woodDatas = {
      ...JSON.parse(req.body.datas),
      // image: pathname,
    };
    // Update
    const wood = await Wood.update(
      { woodDatas },
      {
        where: {
          id: oldWoodDatas.id,
        },
      }
    );
    // Deletes the old image
    // if (oldWoodDatas.image) {
    //   fs.unlink(oldWoodDatas.image, (err) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log("File is deleted.");
    //     }
    //   });
    // }

    res.status(200).json(wood);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update a wood.",
    });
  }
};
