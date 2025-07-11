const express = require('express')
const {createBlog} = require('../controllers/blog.controller')
const {protect} = require('../middleware/authmiddleware')

const router = express.Router()


//route to create a post
router.post("/create",protect, createBlog);

module.exports = router