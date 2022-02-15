const express = require("express")
const colors = require("colors")
const dontenv = require("dotenv").config()
const connetDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 5000


const app = express()
connetDB()

// middleware for recieveing body json data
app.use(express.json())
// middleware for recieveing body url encoded data
app.use(express.urlencoded({extended: false}))

app.use("/api/users", require("./routes/userRoutes"))
app.use('/api/posts/',require('./routes/postRoutes'))
// our errorhandler ( needs to be after routes, dont know why)
app.use(errorHandler)
app.listen(PORT, () => console.log("server running at 5000"))