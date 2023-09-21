const express = require('express');
const controller = require('../controller/member');

const router = new express.Router();

router.post('/register', controller.registerMember);
router.post('/login', controller.login);

module.exports = router;
