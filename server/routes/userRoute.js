const express = require('express')
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserProfile,
} = require("../controllers/user.controller");
const { protect } = require('../middleware/authmiddleware');

const router = express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get("/", getAllUsers);

router.get("/profile", protect, getUserProfile);

module.exports = router