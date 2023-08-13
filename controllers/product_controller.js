const asyncHandler = require('express-async-handler');
const Product = require("../models/ProductModel");
const errorCatcher = require('../util/error_catcher');

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().lean().exec();
    res.json(products);
});

const getProductsForCompatibility = asyncHandler(async (req, res) => {
    const products = await Product.find({compatibility: true}).lean().exec();
    res.json(products);
});

const getProductsBySubCategory = asyncHandler(async (req, res) => {
    const subcategory = req.params.subcategory;

    if (!subcategory) {
        return res.status(400).json({error: true, message: 'Sub category required!'});
    }

    const products = await Product.find({subcategory}).lean().exec();
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.productId;

    if (!id) {
        return res.status(400).json({error: true, message: 'Product ID required!'});
    }

    const product = await Product.findById(id).exec();
    if (!product) {
        res.status(400).json({ error: true, message: `Product not found with ID: ${id}` });
    }

    res.json(product);
});

const addProduct = asyncHandler(async (req, res) => {
    const { name, code, category, subcategory, description, sciencetific, ph, temperature, behaviour, price, images } = req.body;

    await errorCatcher(res, async () => {
        const existingProduct = await Product.findOne({ code }).lean().exec();
        if (existingProduct) {
            return res.status(409).json({ error: true, message: 'Product code already exists!' });
        }

        const product = await Product.create({
            name, code, category, subcategory, description, sciencetific, ph, temperature, behaviour, price, images
        });

        if (product) {
            res.status(201).json(product);
        } else {
            res.status(400).json({ error: true, message: 'Invalid product data recieved!' });
        }

    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, code, category, subcategory, description, sciencetific, ph, temperature, behaviour, price, images } = req.body;

    if (!id) {
        res.status(400).json({ error: true, message: 'Product ID is required!' });
    }

    const product = await Product.findById(id).exec();
    if (!product) {
        res.status(400).json({ error: true, message: `Product not found with ID: ${id}` });
    }

    const duplicate = await Product.findOne({ code }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
        res.status(400).json({ error: true, message: 'Product code already exists!' });
    }

    await errorCatcher(res, async () => {

        const productObject = {
            name, code, category, subcategory, description, sciencetific, ph, temperature, behaviour, price, images
        }

        const updated = await Product.updateOne({ _id: id }, productObject).exec();
        res.status(200).json(updated);

    });

});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.productId;

    if (!id) {
        return res.status(400).json({error: true, message: 'Product ID Required!'});
    }

    const product = await Product.findById(id).exec();
    if (!product) {
        return res.status(400).json({error: true, message: 'Product not found!'});
    }

    const result = await product.deleteOne();
    res.status(200).json(result);

});

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsBySubCategory,
    getProductById,
    getProductsForCompatibility
}