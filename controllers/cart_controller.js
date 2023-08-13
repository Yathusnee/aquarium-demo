const asyncHandler = require('express-async-handler');
const errorCatcher = require('../util/error_catcher');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const md5 = require('crypto-js/md5');

const addToCart = asyncHandler(async (req, res) => {

    const { product, quantity } = req.body;
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: true, message: 'User ID required!' });
    }

    if (!product) {
        return res.status(400).json({ error: true, message: 'Product ID required!' });
    }

    errorCatcher(res, async () => {
        const cartObject = await Cart.findOne({ user: user, active: true }).exec();
        if (cartObject) {
            // Already have a cart
            const updated = await Cart.updateOne({ _id: cartObject._id }, {
                items: [...cartObject.items, { item: product, quantity: quantity }]
            });

            if (!updated) {
                return res.status(400).json({ error: true, message: 'Add to cart failed!' });
            }
            return res.json(updated);
        }

        // Create a new cart and add item
        const newCart = await Cart.create({
            user: user,
            items: [{ item: product, quantity: quantity }],
            active: true
        });

        if (!newCart) {
            return res.status(400).json({ error: true, message: 'Add to cart failed!' });
        }
        return res.json(newCart);
    });

});

const getCartItemCount = asyncHandler(async (req, res) => {

    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: true, message: 'User ID required!' });
    }

    errorCatcher(res, async () => {
        const cartObject = await Cart.findOne({ user: user, active: true }).exec();
        if (!cartObject) {
            return res.status(200).send('0');
        }

        return res.status(200).send(cartObject.items.length.toString());
    });
});

const getCartItems = asyncHandler(async (req, res) => {

    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: true, message: 'User ID required!' });
    }

    const cartObject = await Cart.findOne({ user: user, active: true }).exec();
    if (!cartObject) {
        return res.status(200).json([]);
    }

    const products = [];
    for (let i in cartObject.items) {
        const product = await Product.findById(cartObject.items[i].item).lean().exec();
        if (!product) {
            return res.status(400).json({ error: true, message: 'Product not found!' });
        }

        products.push({ item: product, quantity: cartObject.items[i].quantity });
    }

    res.status(200).json(products);
});

const checkout = asyncHandler(async (req, res) => {
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: true, message: 'User ID required!' });
    }

    const userObject = await User.findById(user).select('-password').lean().exec();
    if (!userObject) {
        return res.status(400).json({ error: true, message: 'User not found!' });
    }

    const cartObject = await Cart.findOne({ user: user, active: true }).exec();
    if (!cartObject) {
        return res.status(200).json([]);
    }

    let total = 0;
    let items = [];
    for (let i in cartObject.items) {
        const product = await Product.findById(cartObject.items[i].item).lean().exec();
        if (!product) {
            return res.status(400).json({ error: true, message: 'Product not found!' });
        }

        total += product.price * cartObject.items[i].quantity;
        items.push(product.name);
    }

    let merchantSecret = 'MjY0MjQzMDEyNzEyODk3Mzc3NTAxODE0MTY0NDI3MzIwOTA1NDc=';
    let merchantId = '1223542';
    let orderId = cartObject._id;
    let amount = total;
    let hashedSecret = md5(merchantSecret).toString().toUpperCase();
    let amountFormated = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    let currency = 'LKR';
    let hash = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

    // TODO: Country and City field in User schema
    res.status(200).json({ hash: hash, order: orderId, items: items, total: amountFormated, firstname: userObject.name, lastname: '', email: userObject.email, phone: userObject.phone, address: userObject.address, city: 'Colombo', country: 'Sri Lanka' });
});

module.exports = {
    addToCart,
    getCartItemCount,
    getCartItems,
    checkout
}