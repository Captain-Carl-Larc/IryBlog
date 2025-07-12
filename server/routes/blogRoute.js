const express = require('express')
const { createBlog, getAllPosts } = require("../controllers/blog.controller");
const {protect} = require('../middleware/authmiddleware')

const router = express.Router()


//route to create a post
router.post("/create",protect, createBlog);

//route to get all posts
router.get("/",protect, getAllPosts);

module.exports = router