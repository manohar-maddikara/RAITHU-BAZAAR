const express = require('express');
const router = express.Router();

// Mock controllers
const getUser = (req, res) => {
  res.status(200).json({ status: 'success', data: { user: {} } });
};

const updateProfile = (req, res) => {
  res.status(200).json({ status: 'success', data: { user: {} } });
};

router.route('/:id')
  .get(getUser)
  .patch(updateProfile);

module.exports = router;
