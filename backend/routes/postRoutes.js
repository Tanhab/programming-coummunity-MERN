const express = require("express")

const router = express.Router()
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostsByUser,
} = require("../controllers/postController")

const { protect } = require("../middleware/authMiddleware")

// Re-route into comment router
const commentRouter = require("./commentRoutes")
router.use("/:postId/comments", commentRouter)

router.route("/").get(protect, getPosts).post(protect, createPost)
router.route('/user').get(protect,getPostsByUser)
router
  .route("/:id")
  .get(protect, getPost)
  .delete(protect, deletePost)
  .put(protect, updatePost)

module.exports = router
