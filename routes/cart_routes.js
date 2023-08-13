const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cart_controller");

router.route('/')
    .get(cartController.getCartItems)
    .post(cartController.addToCart)

router.route('/checkout')
    .post(cartController.checkout);

router.route('/count')
    .get(cartController.getCartItemCount);

module.exports = router;