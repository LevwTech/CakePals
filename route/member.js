const express = require('express');
const controller = require('../controller/member');

const router = new express.Router();

router.post('/register', controller.registerMember);

module.exports = router;
