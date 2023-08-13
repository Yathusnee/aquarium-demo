const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category_controller");

router.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.addCategory)
    // .put(productController.updateProduct)

// router.route('/:productId')
//     .delete(productController.deleteProduct)

module.exports = router;