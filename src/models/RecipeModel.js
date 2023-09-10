const { default: mongoose, Schema } = require("mongoose");
const { IngredientSchema } = require("./IngredientModel");


const RecipeSchema = mongoose.Schema({
    recipeName:{
        type:String,
        required:[true,'Recipe name is a Required Field']
    },
    ingredients:[{ 
        type:Schema.Types.ObjectId,
        ref:'Ingredient'
    }],
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true,
},
)