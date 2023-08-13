const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    description: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    image: {
        type: String,
        required: true,
    },
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['fresh', 'salt', 'brackish'],
        validate: value => value.trim().length > 0
    },
    subcategories: [subCategorySchema],
    description: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Category', categorySchema);