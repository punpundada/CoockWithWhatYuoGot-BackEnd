const express = require('express');
const { userSignup, userLogin, deleteUser } = require('../controller/UserController');
const userRouter = express.Router();


userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.delete('/delete/:id',deleteUser);
userRouter.post('/login',userLogin); 
module.exports=userRouter;