const User = require("../models/user.model");

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

module.exports = { registerUser, loginUser, getAllUsers };
