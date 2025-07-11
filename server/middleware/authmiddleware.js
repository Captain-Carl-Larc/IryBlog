const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;
  let jwtKey = process.env.JWT_KEY;
  let bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.startsWith("Bearer")) {

    //get token
    token = bearerToken.split(" ")[1];

    //if no token in header
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
      //verify token
      const decodedUserId = jwt.verify(token, jwtKey).id;

      //find user
      req.user = await User.findById(decodedUserId ).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }
      next()
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }else{
    return res.status(401).json({message:"There was no Bearer token. TRy again"})
  }

  
};

module.exports = { protect };
