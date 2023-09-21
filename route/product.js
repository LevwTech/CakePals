const express = require('express');
const controller = require('../controller/product');
const { bakerAuth } = require('../middleware/auth');
const router = new express.Router();

router.post('/add', bakerAuth, controller.addProduct);
router.put('/edit', bakerAuth, controller.editProduct);
router.delete('/delete', bakerAuth, controller.deleteProduct);

module.exports = router;
