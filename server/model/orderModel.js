const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    customerDetails: {
        type: Object,
        required: true,
    },

    totalCost: {
        type: Number,
        required: true,
    },

    products: {
        type: Array,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("order", OrderSchema);
