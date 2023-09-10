const express = require("express");
const {
  addOneIngredient,
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
} = require("../controller/IngredientController");

const IngredientRouter = express.Router();

IngredientRouter.post("/addOne", addOneIngredient);
IngredientRouter.get("/get", getAllIngredients);
IngredientRouter.delete("/delete/:id", deleteIngredient);
IngredientRouter.put("/update", updateIngredient);

module.exports = IngredientRouter;
