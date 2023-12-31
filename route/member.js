const express = require('express');
const controller = require('../controller/member');
const { memberAuth } = require('../middleware/auth');

const router = new express.Router();

router.post('/register', controller.registerMember);
router.post('/login', controller.login);
router.get('/list', memberAuth, controller.listProducts);
router.post('/rate', memberAuth, controller.rateOrder);

module.exports = router;
