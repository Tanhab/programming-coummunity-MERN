const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/userModel")
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName,lastName,role, email, password } = req.body
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error("Please include all field")
  }

  // Find user if exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User alewady exists")
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    firstName,
    lastName,
    role,
    email,
    designation: null,
    reg_num : null,
    batch : null,
    dept : null,
    mobile_num : null,
    
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid data")
  }
})

// @route /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // validation
  if (!email || !password) {
    res.status(400)
    throw new Error("Please include all field")
  }
  const user = await User.findOne({ email })

  // check password and user
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
      designation : user.designation,
      reg_num : user.reg_num,
      batch : user.batch,
      dept : user.dept,
      mobile_num : user.mobile_num
    })
  } else {
    res.status(401)
    throw new Error("Invalid login data")
  }
})

const updateUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body)
  const data = {
    id: updatedUser._id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    role: updatedUser.role,
    designation: updatedUser.designation,
    reg_num: updatedUser.reg_num,
    batch: updatedUser.batch,
    dept: updatedUser.dept,
    mobile_num: updatedUser.mobile_num,
  }
  res.status(200).json(data)
})

// @route /api/users
// @access private
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    designation: req.user.designation,
    reg_num: req.user.reg_num,
    batch: req.user.batch,
    dept: req.user.dept,
    mobile_num: req.user.mobile_num,
  }
  res.status(200).json(user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
}
