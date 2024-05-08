const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    regNumber: {
        type: Number,
        required: true,
    },

    name: {
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

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    zipcode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Customer", customerSchema);
