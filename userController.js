const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { name, phone, role, farmLocation } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ status: 'fail', message: 'User already exists' });
    }

    const user = await User.create({ name, phone, role, farmLocation });

    res.status(201).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid phone number' });
    }

    // In a real app, generate a JWT here
    res.status(200).json({
      status: 'success',
      data: { user, token: 'mock-jwt-token-for-' + user._id }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
