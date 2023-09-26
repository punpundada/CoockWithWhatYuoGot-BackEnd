const mongoose = require("mongoose");

const DifficultyLevelSchema = mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, "Level of Difficuilty is a Required Field"],
    },
  },
  {
    timestamps: true,
  }
);

const DifficultyLevelModel = mongoose.model(
  "DifficultyLevel",
  DifficultyLevelSchema
);

module.exports = DifficultyLevelModel;
