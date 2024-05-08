const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("✅ Connected to the database")
    } catch (error) {
        console.log("❌ Coudn't connect to the database")
    }
}

module.exports = connectDB