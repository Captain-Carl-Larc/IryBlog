const express = require('express')
const {
  createBlog,
  getAllPosts,
  getSinglePost,
  getPostsOfUser,
  getOwnPosts,
  updatePost,
  deletePost,
} = require("../controllers/blog.controller");
const {protect} = require('../middleware/authmiddleware')

//initialize route instance
const router = express.Router()


//route to create a post
router.post("/create",protect, createBlog);

//route to get all posts
router.get("/",protect, getAllPosts);

//get loggenin user posts
router.get("/author", protect, getOwnPosts);


//get post by user id
router.get("/author/:authorId", protect, getPostsOfUser);

//route to get post by id
router.get("/:postId", protect, getSinglePost);

//update post
router.put("/:postId", protect, updatePost);

//delete post
router.delete("/:postId", protect, deletePost);

module.exports = router