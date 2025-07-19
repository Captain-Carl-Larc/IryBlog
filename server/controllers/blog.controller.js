const Blog = require("../models/blog.model");
const mongoose = require("mongoose");

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
const getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find({}).populate("author", "username email");
    if (posts === 0) {
      return res.status(404).json({
        message: `could not find any posts`,
        posts: [],
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `could not fetch posts due to ${error.message}`,
    });
  }
};

const getSinglePost = async (req, res) => {
  //get posts id
  const postId = req.params.postId;

  //check id validity
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: `The post id is invalid`,
    });
  }

  //
  try {
    const post = await Blog.findById(postId).populate("author", "username");

    if (!post) {
      return res.status(404).json({
        message: `could not find posts with id ${postId}`,
      });
    }

    //return the found post
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `an error occured when fetching posts ${error.message}`,
    });
  }
};

//get posts of a specific user
const getPostsOfUser = async (req, res) => {
  //get user id
  const userId = req.params.authorId;

  //validate id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: `the id ${userId} is invalid`,
    });
  }
  //get posts
  const posts = await Blog.find({ author: userId }).populate(
    "author",
    "username email"
  );

  if (posts.length === 0) {
    return res.status(404).json({
      message: `no posts for this user were found`,
      posts: [],
    });
  }

  return res.status(200).json(posts);
};

//get users all posts
const getOwnPosts = async (req, res) => {
  //get user Id
  const userId = req.user._id;

  //validate id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: `user id ${userId} is invalid`,
    });
  }

  try {
    const posts = await Blog.find({
      author: userId,
    }).populate("author", "username email");

    if (posts.length === 0) {
      return res.status(404).json({
        message: `No posts were found`,
        posts: [],
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `could not get posts for ${userId} due to ${error.message}.`,
    });
  }
};

//route to update post
const updatePost = async (req, res) => {
  const { title, description, content } = req.body;
  const userId = req.user._id;
  const postId = req.params.postId;

  //validate postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: `${postId} is not a valid post ID.`,
    });
  }
  try {
    //find the blog post
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: `post with id ${postId} could not be found.`,
      });
    }

    //check authorization
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "you are not authorized to update this post",
      });
    }

    //update the post
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        content,
      },
      { new: true, runValidators: true }
    ).populate("author", "email username");
    if (updatedPost) {
      return res.status(200).json({
        message: `blogPost updated successfully.`,
        updatedBlog: updatedPost,
      });
    } else {
      return res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `could not update post due to ${error.message}`,
    });
  }
};

//delete post
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  //validate postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: `${postId} is not a valid post ID.`,
    });
  }

  try {
    const post = await Blog.findById(postId);

    //validate post existence
    if (!post) {
      return res.status(404).json({
        message: `post with id ${postId} could not be found.`,
      });
    }

    //authorization check
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({
        message: `you are not allowed to delete this post`,
      });
    }

    const deletedPost = await Blog.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(500).json({
        message: `could not delete post`,
      });
    } else {
      return res.status(200).json({
        message: `post deleted successfuly`,
        deletedBlog: deletedPost,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `could not delete post`,
      errorMsg: error.message,
    });
  }
};
module.exports = {
  createBlog,
  getAllPosts,
  getSinglePost,
  getPostsOfUser,
  getOwnPosts,
  updatePost,
  deletePost,
};
