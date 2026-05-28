const express = require('express');
const router = express.Router();

// Mock controllers
const createOrder = (req, res) => {
  res.status(201).json({ status: 'success', data: { order: {} } });
};

const getOrder = (req, res) => {
  res.status(200).json({ status: 'success', data: { order: {} } });
};

router.route('/')
  .post(createOrder);

router.route('/:id')
  .get(getOrder);

module.exports = router;
