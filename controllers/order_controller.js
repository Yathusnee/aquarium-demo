const asyncHandler = require('express-async-handler');
const errorCatcher = require('../util/error_catcher');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const placeOrder = asyncHandler(async (req, res) => {
    const user = req.userId;

    if (!user) {
        return res.status(400).json({ error: true, message: 'User ID required!' });
    }

    const userObject = await User.findById(user).select('address').lean().exec();
    if (!userObject) {
        return res.status(400).json({ error: true, message: 'User not found' });
    }

    const cartObject = await Cart.findOne({ user: user, active: true }).exec();
    if (!cartObject) {
        return res.status(200).json({ error: true, message: 'Cart not found' });
    }

    const products = [];
    let total = 0;
    for (let i in cartObject.items) {
        const product = await Product.findById(cartObject.items[i].item).lean().exec();
        if (!product) {
            return res.status(400).json({ error: true, message: 'Product not found!' });
        }

        products.push({ item: product, quantity: cartObject.items[i].quantity });
        total += cartObject.items[i].quantity * product.price;
    }

    errorCatcher(res, async () => {
        const order = await Order.create({ items: products, address: userObject.address, total: total, user: user });
        if (!order) {
            return res.status(400).json({ error: true, message: 'Order creation failed.' });
        }

        const cartUpdate = await Cart.updateOne({ _id: cartObject._id }, { active: false }).exec();
        if (!cartUpdate) {
            return res.status(400).json({ error: true, message: 'Cart update failed.' });
        }

        res.status(200).json(order);
    });
});

const getNewOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ status: 'new' }).lean().exec();
    return res.json(orders);

});

const getAcceptedOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ status: 'accepted' }).lean().exec();
    return res.json(orders);

});

const getShippedOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ status: 'shipped' }).lean().exec();
    return res.json(orders);

});

const acceptOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        return res.status(400).json({ error: true, message: 'Order ID is required!' });
    }

    errorCatcher(res, async () => {
        const result = await Order.findOneAndUpdate({ _id: orderId }, { status: 'accepted' }).exec();
        res.status(200).json(result);
    });
});

const rejectOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        return res.status(400).json({ error: true, message: 'Order ID is required!' });
    }

    errorCatcher(res, async () => {
        const result = await Order.findOneAndUpdate({ _id: orderId }, { status: 'rejected' }).exec();
        res.status(200).json(result);
    });
});

const shipOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        return res.status(400).json({ error: true, message: 'Order ID is required!' });
    }

    errorCatcher(res, async () => {
        const result = await Order.findOneAndUpdate({ _id: orderId }, { status: 'shipped' }).exec();
        res.status(200).json(result);
    });
});

module.exports = {
    shipOrder,
    placeOrder,
    acceptOrder,
    rejectOrder,
    getNewOrders,
    getShippedOrders,
    getAcceptedOrders,
}