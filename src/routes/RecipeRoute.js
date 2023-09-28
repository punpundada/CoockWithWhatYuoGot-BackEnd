const express = require('express');

const { addRecipe, deleteRecipe, getRecipesByIngredients,addRecipeImageUrl ,deleteOneImage, getAllRecipes, getOneRecipe } = require('../controller/RecipeController');
const ValidateToken = require('../middleware/ValidationTokenHandler');

const RecipieRouter = express.Router();

RecipieRouter.post('/add',ValidateToken, addRecipe)
RecipieRouter.delete('/delete/:id',ValidateToken,  deleteRecipe);
RecipieRouter.post('/getByIngredients',getRecipesByIngredients);
RecipieRouter.post('/image/add', ValidateToken,addRecipeImageUrl)
RecipieRouter.delete('/image/delete',ValidateToken,deleteOneImage)
RecipieRouter.get('/get',getAllRecipes) 
RecipieRouter.get('/get/:id', getOneRecipe)  


module.exports=RecipieRouter

