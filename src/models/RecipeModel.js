const { default: mongoose, Schema } = require("mongoose");
const { IngredientSchema } = require("./IngredientModel");

const RecipeSchema = mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Recipe name is a Required Field"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is a Required Field"],
    },
    ingredientsList: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: [true, "Ingredients List is a Required Field"],
        },
        quantity: String,
      },
    ],
    description:{
      type:String,
      required:[true,'Recipe Description is a Required Field'],
      minlength: [150, 'Description should be at least 10 characters long.'],
    },
    prepTime: {
      type: String,
      required: [true, "Prepration Time is a Required Field"],
    },
    difficultyLevel: {
      type: Schema.Types.ObjectId,
      ref: "DifficultyLevel",
      required: [true, "Difficulty Level is a Required Field"],
    },
    imgUrls: [
      {
        imgUrl: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RecipeModel = mongoose.model("Recipes", RecipeSchema);
module.exports = RecipeModel;
