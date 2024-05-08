const mongoose = require('mongoose')
const teamSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    level: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('team', teamSchema)