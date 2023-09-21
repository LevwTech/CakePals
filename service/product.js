const Product = require('../model/product');
const { MAX_DISTANCE_IN_METERS } = require('../config/constants');

class ProductService {
  static async addProduct(body) {
    const { name, type, bakingTime, baker } = body;
    const product = new Product({ name, type, bakingTime, baker });
    await product.save();
    return product;
  }

  static async editProduct({ bakerId, productId, bakingTime, type }) {
    validateProductIsOwnedByBaker(bakerId, productId);
    const product = await Product.findById(productId);
    if (bakingTime) product.bakingTime = bakingTime;
    if (type) product.type = type;
    await product.save();
  }

  static async deleteProduct(bakerId, productId) {
    validateProductIsOwnedByBaker(bakerId, productId);
    const product = await Product.findById(productId);
    await product.delete();
  }

  static async validateProductIsOwnedByBaker(bakerId, productId) {
    const product = await Product.findById(productId).populate('baker').exec();
    const ownedByBaker = product.baker._id.toString() === bakerId;
    if (!ownedByBaker)
      throw new Error('You are not allowed to edit or delete this product');
  }

  static async listProducts({ location, type }) {
    const params = {
      [`baker.location`]: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [location.long, location.lat],
          },
          $maxDistance: MAX_DISTANCE_IN_METERS,
        },
      },
    };
    if (type) params.type = type;
    const products = await Product.find({}, params).populate('baker').exec();
    return products;
  }
}
module.exports = ProductService;
