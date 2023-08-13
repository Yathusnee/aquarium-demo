const asyncHandler = require('express-async-handler');
const Compatibility = require('../models/CompatibilityModel');

const getAllCompatibilities = asyncHandler(async (req, res) => {
    const compatibilities = await Compatibility.find().lean().exec();
    return res.json(compatibilities);
});

module.exports = {
    getAllCompatibilities
}