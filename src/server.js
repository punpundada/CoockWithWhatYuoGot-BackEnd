const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/UserRoute');
const dbConnection = require('./config/dbConnection');
const { Constants } = require('./Constants');
const IngredientRouter = require('./routes/IngredientRoute');
const RecipieRouter = require('./routes/RecipeRoute');
const cuisineRouter = require('./routes/CuisineRoute');
const DifficuiltyLevelRoute = require('./routes/DifficultyLevelRoute');


const app = express();
const port = process.env.PORT || 9002;
app.use(cors());
app.use(express.json())

dbConnection()

app.use('/api/user',userRouter) 
app.use('/api/ingredient', IngredientRouter);
app.use('/api/recipe',RecipieRouter);
app.use('/api/cuisine', cuisineRouter);
app.use('/api/level', DifficuiltyLevelRoute);

app.use((req,res)=>{
    res.status(Constants.NOT_FOUND).json({ message: 'URI Not Found' });
})

app.listen(port , ()=>{
    console.log(`\nListning on http://localhost:${port}`);  
});