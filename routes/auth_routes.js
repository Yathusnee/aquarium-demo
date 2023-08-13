const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.route('/login')
    .post(authController.login)

router.route('/authenticate')
    .post(authController.authenticate);
    
router.route('/register')
    .post(authController.register)

module.exports = router;