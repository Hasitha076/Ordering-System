const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    activeState: {
        type: Boolean,
        required: true,
        default: true,
    },
})

module.exports = mongoose.model('users', userSchema)