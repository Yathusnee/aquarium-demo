const mongoose = require('mongoose');
const { MongoServerError } = require('mongodb/lib/error');

async function errorCatcher(res, callback) {
    try {
        await callback();
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Validation error occurred
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            res.status(400).json({ message: 'Validation error occured', errors });
        } 
        else if (error instanceof MongoServerError) {
            res.status(500).json({ message: "MongoServerError occured " + JSON.stringify(error) });
        }
        else {
            // Other error occurred
            res.status(500).json({ message: "Error occured" });
        }
    }
}

module.exports = errorCatcher;