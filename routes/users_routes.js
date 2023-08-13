const express = require('express');
const router = express.Router();
const userController = require("../controllers/user_controller");
const { restrict } = require('../middleware/auth_middleware');

router.route('/')
    .get(userController.getAllUsers)
    .post(restrict(['admin', 'owner']), userController.addUser)
    .put(restrict(['admin', 'owner', 'receptionist']), userController.updateUser)
    
router.route('/employee/:userId')
    .get(userController.getUser)

router.route('/:userId')
    .delete(restrict(['admin', 'owner', 'receptionist']), userController.deleteUser)

router.route('/address')
    .get(userController.getUserAddress)

router.route('/employees')
    .get(restrict(['admin', 'owner']), userController.getAllEmployees)

router.route('/roles')
    .get(userController.getRoles)

module.exports = router;