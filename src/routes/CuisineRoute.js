const express = require("express");
const ValidateToken = require("../middleware/ValidationTokenHandler");
const {
  addCuisine,
  getAllCuisine,
  updateCuisine,
  deleteCuisine,
} = require("../controller/CuisineController");
const cuisineRouter = express.Router();

cuisineRouter.post("/add", addCuisine);
cuisineRouter.get("/getAll",ValidateToken, getAllCuisine);
cuisineRouter.post("/update", ValidateToken,updateCuisine);
cuisineRouter.delete('/delete/:cousineId',ValidateToken,  deleteCuisine);

module.exports = cuisineRouter;
