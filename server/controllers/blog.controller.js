const Blog = require("../models/blog.model");
const mongoose = require('mongoose')

//create a post

const createBlog = async (req, res) => {
  //destructure request object
  const { title, description, content } = req.body;
  const authorId = req.user._id;

  //check if every data is complete
  if (!title || !description || !content || !authorId) {
    return res.status(400).json({
      message: `please fill all data`,
    });
  }
  try {
    //create post
    const blog = await Blog.create({
      title,
      description,
      content,
      author: authorId,
    });
    //check if post created
    if (blog) {
      return res.status(201).json({
        message: `blog ${blog.title} created successfully.`,
        title: blog.title,
        blogId: blog._id,
        blogAuthor: blog.author,
      });
    } else {
      return res.status(500).json({
        message: `could not create post ${title} , please try again later`,
      });
    }
  } catch (error) {
    console.error(`error occured ${error.message}`);
    res.status(500).json({
      message: `could not create post.`,
      error: error.message,
    });
  }
};

//fetch all posts
const getAllPosts = async (req, res) =>{
  try {
    const posts = await Blog.find({})
    if(posts === 0){
      return res.status(404).json({
        message:`could not find any posts`
      })
    }
    return res.status(200).json(posts)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      message:`could not fetch posts due to ${
      error.message}`
    })
  }
}

module.exports = { createBlog, getAllPosts };
