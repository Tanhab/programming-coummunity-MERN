const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please provide a text for post"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Post", postSchema)
