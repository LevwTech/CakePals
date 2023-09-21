const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  baker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baker',
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  paymentMethod: {
    enum: ['cash', 'credit'],
    required: true,
  },
  status: {
    enum: ['pending', 'accepted', 'rejected', 'delivered'],
    default: 'pending',
  },
  collectionTime: {
    type: Date,
    required: true,
  },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
