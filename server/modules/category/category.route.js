const express = require('express');
const { check } = require('express-validator');
const categoryControllers = require('./category.controller');
const checkUser = require('../../middleware/check-user');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();
// Get userId if user is loggedIn
router.use(checkUser);

// Add new Category
router.post(
  '/',
  [check('name').not().isEmpty(), check('description').not().isEmpty()],
  checkAuth,
  categoryControllers.addCategory
);
// Get all category
router.get('/', categoryControllers.getAllCategory);

// Get single category
router.get('/:cid', categoryControllers.getCategoryById);

// Delete Category
router.delete('/:cid', checkAuth, categoryControllers.deleteCategory);

// Update category
router.patch(
  '/:cid',
  [check('name').not().isEmpty(), check('description').not().isEmpty()],
  checkAuth,
  categoryControllers.updateCategory
);
module.exports = router;
