const orderService = require('../service/order');
const productService = require('../service/product');
module.exports = {
  placeOrder: async (req, res) => {
    try {
      const { productId, paymentMethod } = req.body;
      const member = req.member;
      const product = await productService.getProduct(productId);
      const collectionTime = orderService.calculateCollectionTime(
        productId,
        product.bakingTime,
      );
      const order = await orderService.placeOrder({
        member,
        product,
        paymentMethod,
        collectionTime,
      });
      res
        .status(201)
        .json({ message: 'Order has been placed successfully', data: order });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  editOrderStatus: async (req, res) => {
    try {
      const { orderId, status } = req.body;
      const bakerId = req.baker._id;
      await orderService.editOrderStatus({ bakerId, orderId, status });
      res.status(200).json({ message: 'Order status has been updated' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
