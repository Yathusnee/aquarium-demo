const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    code: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['fresh', 'salt', 'brackish'],
        validate: value => value.trim().length > 0
    },
    subcategory: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    description: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    sciencetific: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    ph: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    temperature: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    behaviour: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    price: {
        type: Number,
        required: true,
        validate: value => value > 0
    },
    images: [{
        type: String,
    }],
});

const orderItemSchema = new mongoose.Schema({
    item: productSchema,
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    address: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'accepted', 'cancelled', 'shipped', 'rejected']
    }
});

module.exports = mongoose.model('Order', orderSchema);