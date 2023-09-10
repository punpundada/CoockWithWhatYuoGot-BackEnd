const express = require('express');
const { addRecipe, deleteRecipe, getRecipesByIngredients } = require('../controller/RecipeController');

const RecipieRouter = express.Router();

RecipieRouter.post('/add',addRecipe)
RecipieRouter.delete('/delete/:id',deleteRecipe);
RecipieRouter.post('/getByIngredients',getRecipesByIngredients)



module.exports=RecipieRouter

