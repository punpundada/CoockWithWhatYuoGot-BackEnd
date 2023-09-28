const express = require('express');
const { userSignup, userLogin, deleteUser, getAllUserRecipe, setProfilePicture, getProfilePicture } = require('../controller/UserController');

const ValidateToken = require('../middleware/ValidationTokenHandler');

const userRouter = express.Router();


userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.delete('/delete/:id',ValidateToken, deleteUser);
userRouter.get('/recipe/getAll', ValidateToken,getAllUserRecipe)
userRouter.post('/setProfile',ValidateToken,setProfilePicture)
userRouter.get('/getProfile',ValidateToken,getProfilePicture)
module.exports=userRouter; 


