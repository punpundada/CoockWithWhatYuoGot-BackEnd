const express = require("express");
const {
  addLevel,
  getAllLevels,
} = require("../controller/DifficultyLevelController");

const DifficuiltyLevelRoute = express.Router();

DifficuiltyLevelRoute.post("/add", addLevel);
DifficuiltyLevelRoute.get("/getAll", getAllLevels);

module.exports = DifficuiltyLevelRoute;
