const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Comment = require("../models/commentModel")
const Post = require("../models/postModel")

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  let post = null
  try {
     post = await Post.findById(req.params.postId)
  } catch (error) {
    res.status(401)
    throw new Error("Invalid post")
  }
  if(!post){
    res.status(401)
    throw new Error('No post found')
  }
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const comments = await Comment.find({ post: req.params.postId })

  res.status(200).json(comments)
})

// @desc    Create post comment
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  let post = null
  try {
    post = await Post.findById(req.params.postId)
  } catch (error) {
    res.status(401)
    throw new Error("Invalid post")
  }

  if(!post){
     res.status(401)
     throw new Error("Post not found")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const comment = await Comment.create({
    text: req.body.text,
    post: req.params.postId,
    user: req.user.id,
  })

  res.status(200).json(comment)
})

const deleteComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  let comment 
  try{
    comment = await Comment.findById(req.params.id)

  }catch(error){
    res.status(401)
    throw new Error("Invalid comment")
  }

  if (!comment) {
    res.status(404)
    throw new Error("comment not found")
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  await comment.remove()

  res.status(200).json({ success: true })
})

module.exports = {
  getComments,
  addComment,
  deleteComment
}
