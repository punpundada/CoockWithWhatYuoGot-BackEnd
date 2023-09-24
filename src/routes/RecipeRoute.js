const express = require('express');

const { addRecipe, deleteRecipe, getRecipesByIngredients } = require('../controller/RecipeController');
const ValidateToken = require('../middleware/ValidationTokenHandler');

const RecipieRouter = express.Router();

RecipieRouter.post('/add',ValidateToken, addRecipe)
RecipieRouter.delete('/delete/:id',ValidateToken,  deleteRecipe);
RecipieRouter.post('/getByIngredients',getRecipesByIngredients);


module.exports=RecipieRouter

