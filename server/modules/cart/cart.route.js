const express = require('express');
const { check } = require('express-validator');
const cartControllers = require('./cart.controller');
const checkUser = require('../../middleware/check-user');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();
// Get userId if user is loggedIn
router.use(checkUser);

// Add new Category
router.post(
    '/',
    [check('id').not().isEmpty(), check('quantity').not().isEmpty()],
    checkAuth,
    cartControllers.addItemInCatrt
  );

// Get all cart item
router.get('/', checkAuth, cartControllers.getAllCartItems);

// Update cart item
router.put(
  '/:cid',
  [check('quantity').not().isEmpty()],
  checkAuth,
  cartControllers.updateCart
);
// Delete cart item
router.delete(
  '/:cid',
  checkAuth,
  cartControllers.deleteCart
);

  module.exports = router;
