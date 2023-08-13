const asyncHandler = require('express-async-handler');
const errorCatcher = require('../util/error_catcher');
const Category = require('../models/CategoryModel');

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().lean().exec();
    res.json(categories);
});

const addCategory = asyncHandler(async (req, res) => {
    const { name, description, subcategories } = req.body;

    if (!subcategories) {
        return res.status(409).json({ error: true, message: 'Sub categories are required' });
    }

    for (let i in subcategories) {
        if (!subcategories[i].name || !subcategories[i].description || !subcategories[i].image) {
            return res.status(409).json({ error: true, message: 'All the fields are required' });
        }
    }

    await errorCatcher(res, async () => {
        const existingCategory = await Category.findOne({ name }).lean().exec();
        if (existingCategory) {
            return res.status(409).json({ error: true, message: 'Category already exists!' });
        }

        const category = await Category.create({
            name, description, subcategories
        });

        if (category) {
            res.status(201).json(category);
        } else {
            res.status(400).json({ error: true, message: 'Invalid category data recieved!' });
        }

    });
});


module.exports = {
    getAllCategories,
    addCategory,
}