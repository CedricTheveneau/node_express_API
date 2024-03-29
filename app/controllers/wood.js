const { Wood } = require("../models");
const { woodCollectionHateoas, woodHateoas } = require("../helpers/hateoas");
const fs = require("fs");
exports.list = async (req, res) => {
  try {
    let woods = await Wood.findAll();
    woods = woods.map((wood) => {
      return {
        ...wood.toJSON(),
        links: woodHateoas(wood),
      };
    });
    res.status(200).json({ woods, links: woodCollectionHateoas() });
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
    let woods = await Wood.findAll({
      where: {
        hardness: hardness,
      },
    });
    woods = woods.map((wood) => {
      return {
        ...wood.toJSON(),
        links: woodHateoas(wood),
      };
    });

    res.status(200).json({ woods, links: woodCollectionHateoas() });
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
    let wood = await Wood.create(woodDatas);
    wood = {
      ...wood.toJSON(),
      links: woodHateoas(wood),
    };
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
    let wood = await Wood.findByPk(req.params.id);
    if (!wood) {
      res.status(404).json({
        message: err.message || "Didn't find the wood you were looking for.",
      });
    }

    let newWood = {
      ...JSON.parse(req.body.datas),
    };

    if (req.file) {
      const pathname = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      newWood = {
        ...JSON.parse(req.body.datas),
        image: pathname,
      };
      if (wood.image) {
        const oldPath = wood.image.split("uploads")[1];
        fs.unlink(`uploads/${oldPath}`, (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
      }
    }
    await wood.update(newWood);
    wood = {
      ...wood.toJSON(),
      links: woodHateoas(wood),
    };
    res.status(200).json(wood);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update a wood.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id);
    if (!wood) {
      res.status(404).json({
        message: err.message || "Didn't find the wood you were looking for.",
      });
    }
    if (wood.image) {
      const oldPath = wood.image.split("uploads")[1];
      fs.unlink(`uploads/${oldPath}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    }
    await wood.destroy(wood);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update a wood.",
    });
  }
};
