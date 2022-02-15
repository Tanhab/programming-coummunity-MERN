const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Post = require("../models/postModel")
const Comment = require("../models/commentModel")



// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()

  res.status(200).json(posts)
})

// @desc    Get user posts
// @route   GET /api/posts
// @access  Private
const getPostsByUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const posts = await Post.find({ user: req.user.id })

  res.status(200).json(posts)
})

// @desc    Get user post
// @route   GET /api/posts/:id
// @access  Private
const getPost = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  let post = null
  try {
    post = await Post.findById(req.params.id)
  } catch (error) {
    res.status(401)
    throw new Error("Invalid post")
  }

  if (!post) {
    res.status(404)
    throw new Error("post not found")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  res.status(200).json(post)
})

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body

  if (!text) {
    res.status(400)
    throw new Error("Please add a text")
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const post = await Post.create({
    text,
    user: req.user.id,
  })

  res.status(201).json(post)
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  let post = null
  try {
    post = await Post.findById(req.params.id)
  } catch (error) {
    res.status(401)
    throw new Error("Invalid post")
  }

  if (!post) {
    res.status(404)
    throw new Error("post not found")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  await post.remove()

  await Comment.deleteMany({ post: req.params.id })

  res.status(200).json({ success: true })
})

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  let post = null
  try {
    post = await Post.findById(req.params.id)
  } catch (error) {
    res.status(401)
    throw new Error("Invalid post")
  }

  if (!post) {
    res.status(404)
    throw new Error("post not found")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  const updatedpost = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedpost)
})

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostsByUser,
}
