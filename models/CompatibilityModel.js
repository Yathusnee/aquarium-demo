const mongoose = require('mongoose');

const compatibilitySchema = new mongoose.Schema({
    compatibility: {
        type: String,
        required: true,
        enum: ['compatible', 'not', 'sometimes']
    },
    product1Id: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    product2Id: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
});

module.exports = mongoose.model('Compatibility', compatibilitySchema);