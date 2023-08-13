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
    icon: {
        type: String,
        default: '',
    },
    compatibility: {
        type: Boolean,
        default: false,
    },
    iconWidth: {
        type: Number,
        default: 1,
    },
    iconHeight: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('Product', productSchema);