const jwt = require("jsonwebtoken");
const { Constants } = require("../Constants");

const ValidateToken = async (req, res, next) => {
  let token;
  let authHeader = req.header.authorization || req.header.Authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(Constants.UNAUTHORIZED)
            .json({ isSuccess: false, data: { message: err.message } });
        }
        req.user = decoded.user;
      });
    }
  } catch (error) {
    return res.status(Constants.FORBIDDEN).json({isSuccess:false,data:{message:error.message}})
  }
};

module.exports=ValidateToken