const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: value => value.trim().length > 0
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        validate: value => value.trim().length > 0
    },
    password: {
        type: String,
        required: true,
        validate: value => value.trim().length >= 6
    },
    email: {
        type: String,
        lowercase: true,
        validate: value => validator.isEmail(value)
    },
    active: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        validate: value => value.trim().length > 0
    },
    phone: {
        type: String,
        required: true,
        validate: value => value.trim().length >= 10
    },
    points: {
        type: Number,
        default: 0
    },
    roles: [{
        type: String,
        default: "customer",
        enum: ['customer', 'employee', 'admin', 'receptionist', 'owner']
    }],
});

module.exports = mongoose.model('User', userSchema);