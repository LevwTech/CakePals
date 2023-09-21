const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  bakingTime: {
    type: Number,
    required: true,
  },
  baker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baker',
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
