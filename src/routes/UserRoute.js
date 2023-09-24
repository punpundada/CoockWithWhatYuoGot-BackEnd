const express = require('express');
const { userSignup, userLogin, deleteUser, getAllUserRecipe } = require('../controller/UserController');
const ValidateToken = require('../middleware/ValidationTokenHandler');
const userRouter = express.Router();


userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.delete('/delete/:id',ValidateToken, deleteUser);
userRouter.post('/recipe/getAll', getAllUserRecipe)
module.exports=userRouter; 