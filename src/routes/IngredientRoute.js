const express = require("express");
const {
  addOneIngredient,
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
} = require("../controller/IngredientController");
const ValidateToken = require("../middleware/ValidationTokenHandler");

const IngredientRouter = express.Router();

IngredientRouter.post("/addOne",ValidateToken, addOneIngredient);
IngredientRouter.get("/get",ValidateToken, getAllIngredients);
IngredientRouter.delete("/delete/:id",ValidateToken, deleteIngredient);
IngredientRouter.put("/update",ValidateToken, updateIngredient);

module.exports = IngredientRouter;
