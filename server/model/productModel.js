const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    unitPrice: {
        type: Number,
        required: true
    },

    qtyOnHand: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("product", productSchema);
