const { Constants } = require("../Constants");
const DifficultyLevelModel = require("../models/DifficultyLevel");

const DifficultyLevel = DifficultyLevelModel;

const addLevel = async (req, res) => {
  const { level } = req.body;
  if (!level) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: {
        message: `Level is a Required Field`,
      },
    });
  }
  console.log(level);

  try {
    const availableLevel = await DifficultyLevelModel.find({
      level: level.toUpperCase(),
    });
    console.log(availableLevel);
    if (availableLevel.length !== 0) {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: {
          message: `Level is already available`,
        },
      });
    }
    const newLevel = await DifficultyLevelModel.create({
      level: level.toUpperCase(),
    });
    if (newLevel) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: {
          level: newLevel.level,
          message: `Level ${newLevel.level} Created`,
        },
      });
    } else {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: {
          message: `Level is not Created`,
        },
      });
    }
  } catch (error) {
    return res.status(Constants.FORBIDDEN).json({
      isSuccess: false,
      data: {
        message: error.message,
      },
    });
  }
};

const getAllLevels = async (req, res) => {
  try {
    const allLevels = await DifficultyLevelModel.find();
    if (!allLevels) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: `Levels not found`,
        },
      });
    } else {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: {
          levles: allLevels,
          message: `Levels not found`,
        },
      });
    }
  } catch (error) {}
};

module.exports = { addLevel, getAllLevels };
