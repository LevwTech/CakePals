const express = require('express');
const controller = require('../controller/baker');

const router = new express.Router();

router.post('/register', controller.registerBaker);
router.post('/login', controller.login);
router.get('/profile/:bakerId', controller.getBakerProfile);

module.exports = router;
