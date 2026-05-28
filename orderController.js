const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice, user } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({ status: 'success', data: { order: createdOrder } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name phone');

    if (!order) {
      return res.status(404).json({ status: 'fail', message: 'Order not found' });
    }

    res.status(200).json({ status: 'success', data: { order } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
