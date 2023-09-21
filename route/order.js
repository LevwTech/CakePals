const express = require('express');
const controller = require('../controller/order');
const { memberAuth, bakerAuth } = require('../middleware/auth');
const router = new express.Router();

router.post('/place', memberAuth, controller.placeOrder);
router.put('/status', bakerAuth, controller.editOrderStatus); // bakers can accept, reject or fulfill orders here

module.exports = router;
