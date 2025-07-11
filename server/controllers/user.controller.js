const User = require("../models/user.model");
const jwt = require('jsonwebtoken')


//token generation for auth

const generateToken = (id)=>{
  const jwtKey = process.env.JWT_KEY;
  const jwtExpiry = process.env.JWT_EXPIRE;
  return jwt.sign({ id }, jwtKey, {
    expiresIn:jwtExpiry
  });
}
//register user

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //check if req data is complete
  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "Please input all details!" });
  }

  //
  try {
    //see if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: `user with email ${email} already exists`,
      });
    }

    //create user
    const user = await User.create({
      username,
      email,
      password,
    });

    //response
    if (user) {
      res.status(201).json({
        message: `user ${user.username} created successfully`,
        userId: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({
        message: `could not create user ${username}`,
      });
    }
  } catch (error) {
    console.error(`error occured during registration : ${error.message}`);
    res.status(500).json({
      message: `Internal server error when registering, please try again`,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validate
  if (!email || !password) {
    return res.status(400).json({
      message: `Please fill in the login details.`,
    });
  }

  //initiate login  by password comparison
  try {
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `user with email ${email} could not be found!`,
      });
    }

    //otherwise if user exists compare password
    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      res.status(200).json({
        message: `login for ${email} was successful`,
        userId: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: `invalid login credentials` });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: `we could not login ${email} due to ${error.message}`,
    });
  }
};

//get all users (for testing purposes)
const getAllUsers = async (req,res) => {

    try {
        const users = await User.find({});
        if(!users){
            res.status(404).json({message:"no users found"})
        }else{
            res.status(200).json(users)
        }
    } catch (error) {
        console.erro(error.message)
        res.status(500).json({message:"could not get users"})
    }
}

//get user profile
const getUserProfile = async (req,res)=>{
  const userId = req.user.id

  const user = await User.findById(userId).select('-password')

  if(user){
    res.status(200).json({
      message:`user profile for ${user.username} retrieved`,
      username:user.username,
      userEmail:user.email
    })
  }else{
    return res.status(200).json({
      message:`user could not be found`,

    })
  }
}

module.exports = { registerUser, loginUser, getAllUsers, getUserProfile };
