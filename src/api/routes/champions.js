const {
  insertManyChampions,
  getAllChampions,
} = require("../controllers/champion");

const championsRouter = require("express").Router();

championsRouter.get("/", getAllChampions);
championsRouter.post("/recolectar-campeones", insertManyChampions);

module.exports = championsRouter;
