const express = require('express');
const router = express.Router();
const compatibilityController = require("../controllers/compatibility_controller");

router.route('/')
    .get(compatibilityController.getAllCompatibilities)

module.exports = router;