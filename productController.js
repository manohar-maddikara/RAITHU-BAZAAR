const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmerId', 'name farmLocation');
    res.status(200).json({ status: 'success', data: { products } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'name farmLocation');
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: { product } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
