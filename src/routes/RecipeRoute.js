const express = require('express');
const { addRecipe, deleteRecipe } = require('../controller/RecipeController');

const RecipieRouter = express.Router();

RecipieRouter.post('/add',addRecipe)
RecipieRouter.delete('/delete/:id',deleteRecipe);

module.exports=RecipieRouter

