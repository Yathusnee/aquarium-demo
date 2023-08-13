const express = require('express');
const { restrict } = require('../middleware/auth_middleware');
const router = express.Router();
const orderController = require("../controllers/order_controller");

router.route('/place')
    .post(orderController.placeOrder);

router.route('/newOrders')
    .get(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.getNewOrders)

router.route('/acceptedOrders')
    .get(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.getAcceptedOrders)

router.route('/shippedOrders')
    .get(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.getShippedOrders)

router.route('/accept/:orderId')
    .post(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.acceptOrder);

router.route('/reject/:orderId')
    .post(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.rejectOrder);
    
router.route('/ship/:orderId')
    .post(restrict(['employee', 'admin', 'owner', 'receptionist']), orderController.shipOrder);

module.exports = router;