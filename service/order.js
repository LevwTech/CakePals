const Order = require('../model/order');

class OrderService {
  static async calculateCollectionTime(productId, bakingTime) {
    const orders = await Order.find({
      product: productId,
      status: 'pending',
    }).sort({ createdAt: -1 });
    if (!orders.length) return new Date();
    else {
      const lastOrder = orders[0];
      const lastOrderCollectionTime = lastOrder.collectionTime;
      const collectionTime = new Date(lastOrderCollectionTime);
      collectionTime.setMinutes(collectionTime.getMinutes() + bakingTime);
    }
    return collectionTime;
  }

  static async placeOrder({ member, product, paymentMethod, collectionTime }) {
    const order = new Order({
      member,
      product,
      paymentMethod,
      collectionTime,
    });
    await order.save();
    return order;
  }

  static async editOrderStatus({ bakerId, orderId, status }) {
    validateOrderIsOwnedByBaker(bakerId, orderId);
    await Order.findByIdAndUpdate(orderId, { status });
  }

  static async validateOwnerIsOrderByBaker(bakerId, orderId) {
    const order = await Order.findById(orderId).populate('baker').exec();
    const ownedByBaker = order.baker._id.toString() === bakerId;
    if (!ownedByBaker)
      throw new Error('You are not allowed to change the status of this order');
  }
}
module.exports = OrderService;
