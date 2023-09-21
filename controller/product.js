const productService = require('../service/product');
module.exports = {
  addProduct: async (req, res) => {
    try {
      const product = await productService.addProduct({
        ...req.body,
        baker: req.baker._id,
      });
      res
        .status(201)
        .json({ message: 'Product has been added successfully', product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  editProduct: async (req, res) => {
    try {
      const { productId, type, bakingTime } = req.body;
      const bakerId = req.baker._id;
      await productService.editProduct({
        bakerId,
        productId,
        bakingTime,
        type,
      });
      res.status(201).json({ message: 'Product has been edited successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.body;
      const bakerId = req.baker._id;
      await productService.deleteProduct(bakerId, productId);
      res
        .status(201)
        .json({ message: 'Product has been deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
