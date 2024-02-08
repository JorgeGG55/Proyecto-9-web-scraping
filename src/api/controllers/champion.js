const Champion = require("../models/champions");

const insertManyChampions = async (req, res, next) => {
  const champions = require("../../../champions.json");
  try {
    await Champion.insertMany(champions); // Cambio aquí
    return res.status(201).json("Todos los campeones subidos a la BBDD");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllChampions = async (req, res, next) => {
  try {
    const allChampions = await Champion.find();
    if (allChampions.length === 0) {
      return res.status(404).json({ message: "No se encontraron campeones" });
    }
    return res.status(200).json(allChampions);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { insertManyChampions, getAllChampions };
