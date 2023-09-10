const expressAsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { Constants } = require("../Constants");
const jwt = require("jsonwebtoken");


const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Missing Fields" } });
      return;
    }
    if (password.length < 6 || password.length > 30) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "Password Must be between 6 to 30 Characters" },
      });
    }
    const availableUser = await User.findOne({ email });
    if (availableUser) {
      return res.status(Constants.UNAUTHORIZED).json({
        isSuccess: false,
        data: { message: "User already Registred" },
      });
    }

    const bcriptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password:bcriptPassword,
    });

    if (user) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: {
          email,
          userId: user._id,
        },
      });
    } else {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Validation Error" } });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: { message: "ID not passed or found" },
      });
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(Constants.NOT_FOUND)
        .json({ isSuccess: false, data: { message: "User not found" } });
    }
    if (user._id.toString() !== id) {
      return res.status(Constants.UNAUTHORIZED).json({
        isSuccess: false,
        data: { message: "Unauthorized Deletion Operation" },
      });
    }
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res
        .status(Constants.OK)
        .json({
          isSuccess: true,
          data: {
            message: `User with email : ${user.email} Deleted Succesfully`,
          },
        });
    } else {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: `Something Went Wrong` } });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({
          isSuccess: false,
          data: { message: "Email and Password are Necessary" },
        });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60m",
        }
      );

      return res
        .status(Constants.OK)
        .json({
          isSuccess: true,
          data: { accessToken, message: "Logged in Successfully" },
        });
    } else {
      return res
        .status(Constants.NOT_FOUND)
        .json({
          isSuccess: false,
          data: {
            message: `User with email : ${email} and password : ${password} not found`,
          },
        });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

module.exports = { userSignup, userLogin, deleteUser };
