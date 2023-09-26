const { Constants } = require("../Constants");
const RecipeModel = require("../models/RecipeModel");

const addRecipe = async (req, res) => {
  try {
    const { recipeName, ingredientsList, prepTime,difficultyLevel } = req.body;
    const user = req.user;
    if ((recipeName === undefined  || !ingredientsList, !prepTime, !difficultyLevel)) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "Missing Fields" },
      });
    }

    if (!Array.isArray(ingredientsList)) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: `ingredientsList should be a array type` },
      }); 
    }
    const foundRecipe = await RecipeModel.findOne({
      recipeName: recipeName.toUpperCase(),
      userId,
    });

    if (foundRecipe !== undefined && foundRecipe !== null) {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: {
          message: `User with id: ${userId} has already Recipe with name: ${recipeName}`,
        },
      });
    }

    const newRecipe = await RecipeModel.create({
      recipeName,
      userId:user.id,
      ingredientsList,
      prepTime,
      difficultyLevel
    });

    if (newRecipe) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: { message: `New Recipe with id:${newRecipe._id} is created ` },
      });
    } else {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: error.message },
      });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Recipe id is required" } });

    }

    const deletadRecipe = await RecipeModel.findByIdAndDelete({ _id: id });
    if (deletadRecipe) {
      return res
        .status(Constants.OK)
        .json({
          isSuccess: true,
          data: { message: `Recipe with ${deletadRecipe._id} id Deletad` },
        });
    } else {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Recipe is not Deleted" } });
    }
  } catch (error) {
    return res
      .status(Constants.VALIDATION_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const getRecipesByIngredients = async (req, res) => {
  const { ingredientsTosearch } = req.body;
  try {

    if (!ingredientsTosearch) {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({
          isSuccess: false,
          data: { message: "Ingredient List not found" },
        });
    };

    const recipes = await RecipeModel.find({
      "ingredientsList.ingredientId": { $all: ingredientsTosearch },
    });

    if (recipes && recipes.length !== 0) {
      return res
        .status(Constants.OK)
        .json({ isSuccess: true, data: { recipes, message: "Recipes found" } });
    } else {
      return res
        .status(Constants.NOT_FOUND)
        .json({ isSuccess: false, data: { message: "Recipes not found" } });
    };
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  };
};

module.exports = { addRecipe, deleteRecipe, getRecipesByIngredients };

