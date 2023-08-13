const express = require('express');
const router = express.Router();
const productController = require("../controllers/product_controller");

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.addProduct)
    .put(productController.updateProduct);

router.route('/compatibility')
    .get(productController.getProductsForCompatibility)

router.route('/:productId')
    .delete(productController.deleteProduct);

router.route('/bysubcat/:subcategory')
    .get(productController.getProductsBySubCategory);

router.route('/byid/:productId')
    .get(productController.getProductById);

module.exports = router;