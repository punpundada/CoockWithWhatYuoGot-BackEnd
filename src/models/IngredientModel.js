const { default: mongoose } = require("mongoose");


const IngredientSchema=mongoose.Schema({
    ingredientName:{
        type:String,
        required:[true,'Ingredient Name is a Required Field']
    }
},
{
    timestamps:true,
},
);

const IngredientModel=mongoose.model('Ingredient', IngredientSchema);
module.exports=IngredientModel;