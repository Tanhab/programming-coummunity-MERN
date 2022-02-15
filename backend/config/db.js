const mongoose = require("mongoose")

const connetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo database : " + conn.connection.host.yellow.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

module.exports = connetDB
