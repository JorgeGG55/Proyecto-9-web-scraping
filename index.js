require("dotenv").config();
const fs = require("fs");
const express = require("express");
const championsRouter = require("./src/api/routes/champions");
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const browserObject = require("./browser");
const scraperController = require("./src/utils/pageController");

const app = express();
connectDB();

app.use(cors());

app.use("/api/champions", championsRouter);

function championsJsonExists() {
  return fs.existsSync("champions.json");
}

if (!championsJsonExists()) {
  let browserInstance = browserObject.startBrowser();
  scraperController(browserInstance);
} else {
  console.log(
    "El archivo champions.json ya existe en el proyecto. Para ejecutar el Scraper elimina el archivo champions.json."
  );
}

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000");
});
