const { Constants } = require("../Constants");
const { IngredientModel } = require("../models/IngredientModel");

const addOneIngredient = async (req, res) => {
  try {
    const { ingredientName } = req.body;
    //if name is not provided
    if (!ingredientName) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: { message: "Ingredient name not provided" },
      });
    }

    //if already exists
    const availableIngredient = await IngredientModel.findOne({
      ingredientName: ingredientName.toUpperCase(),
    });

    if (availableIngredient) {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: {
          message: `Ingredient with ${availableIngredient.ingredientName} name is already available`,
        },
      });
    }

    //creating new entry in db
    const ingredient = await IngredientModel.create({
      ingredientName: ingredientName.toUpperCase(),
    });

    if (ingredient !== undefined || ingredient !== null) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: true,
        data: { id: ingredient._id, message: "New Ingredient is created" },
      });
    } else {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "New Ingredient is not created" },
      });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientModel.find();
    if (ingredients) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { ingredients, message: "All Ingredients" },
      });
    } else {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: { message: "Ingrediants not Found" },
      });
    }
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: { message: error.message },
    });
  }
};

const addAllIngredients = async (req, res) => {
  try {
    const { ingredientList } = req.body;

    if (!ingredientList) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "List of Ingredients not Provided" },
      });
    }
    // const results=[]
    // ingredientList.forEach(async (item,index)=>{
    //     const result = await addOneIngredient(req,res)
    // })
  } catch (error) {}
};

const addOneHelper = async (ingredientName) => {
  try {
    // if (!ingredientName) {
    //     return res.status(Constants.NOT_FOUND).json({
    //       isSuccess: false,
    //       data: { message: "Ingredient name not provided" },
    //     });
    //   };

    //if already exists
    const availableIngredient = await IngredientModel.findOne({
      ingredientName: ingredientName.toUpperCase(),
    });

    if (availableIngredient) {
      return;
      // res.status(Constants.FORBIDDEN).json({
      //   isSuccess: false,
      //   data: {
      //     message: `Ingredient with ${availableIngredient.ingredientName} name is already Exisits`,
      //   },
      // });
    }

    //creating new entry in db
    const ingredient = IngredientModel.create({
      ingredientName: ingredientName.toUpperCase(),
    });

    if (ingredient !== undefined && ingredient !== null) {
      return;
      // res.status(Constants.VALIDATION_ERROR).json({
      //   isSuccess: true,
      //   data: { id: ingredient._id, message: "New Ingredient is created" },
      // });
    } else {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "New Ingredient is not created" },
      });
    }
  } catch (error) {}
};

const deleteIngredient = async (req, res) => {
  try {
    const  id  = req.params.id;

    if (!id) {
      return res
        .status(Constants.NOT_FOUND)
        .json({
          isSuccess: false,
          data: { message: "Ingredient Id not found " },
        });
    };

    const ingredient = await IngredientModel.findOne({ _id: id });

    if (ingredient) {
      const result = await IngredientModel.deleteOne({ _id: id });
      if (result.deletedCount === 1)
        return res
          .status(Constants.OK)
          .json({
            isSuccess: true,
            data: {
              message: `Ingredient ${ingredient.ingredientName} deleted `,
            },
          });
      return res
        .status(Constants.NOT_FOUND)
        .json({
          isSuccess: false,
          data: { message: "Ingredient not deleted" },
        });
    } else {
      return res
        .status(Constants.NOT_FOUND)
        .json({
          isSuccess: false,
          data: { message: `Ingredient with ${id} not deleted` },
        });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const updateIngredient =async(req,res)=>{
    const {id, ingredientName } = req.body;
    try {
        if(!id || !ingredientName){
            return res
            .status(Constants.NOT_FOUND)
            .json({ isSuccess: false, data: { message: 'Ingredient id or name not found' } });
        };

        const updatedIngredient = await IngredientModel.findByIdAndUpdate(
            id,
            {ingredientName },
            {new:true}
        );
        if(updatedIngredient){
            return res
            .status(Constants.OK)
            .json({ isSuccess: true, data: { message: `Ingredient with ${updatedIngredient._id}  id Updated` } });
        }
        else{
            return res
            .status(Constants.UNAUTHORIZED)
            .json({ isSuccess: false, data: { message: `Ingredient not updated` } });
        };
    } catch (error) {
        return res
        .status(Constants.OK)
        .json({ isSuccess: false, data: { message: error.message } });
    }
};


module.exports = { addOneIngredient, getAllIngredients,deleteIngredient,updateIngredient };
