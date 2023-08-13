const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    quantity: {
        type: Number,
        required: true,
        validate: value => value > 0
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    items: [cartItemSchema],
    date: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);