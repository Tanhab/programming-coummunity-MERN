const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default : 'Student',
      enum : ['Student', 'Teacher']
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    designation : {
        type : String,
    },
    dept : {
        type : String,
    },
    batch : {
        type : Number,
    },
    reg_num : {
        type : Number,
    },
    mobile_num : {
        type : Number,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
