const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
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
      type: String,
      enum: ['cash', 'credit'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'delivered'],
      default: 'pending',
    },
    collectionTime: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
