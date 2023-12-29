const express = require('express');
const { check } = require('express-validator');
const categoryControllers = require('./category.controller');
const checkAuth = require('../../middleware/check-auth');
const checklRole = require('../../middleware/check-role');
const { ROLES } = require('../../constants');

const router = express.Router();

// Add new Category
router.post(
  '/add',
  [check('name').not().isEmpty(), check('description').not().isEmpty()],
  checkAuth,
  checklRole.check(ROLES.Admin),
  categoryControllers.addCategory
);
router.get(
  '/list',
  categoryControllers.getCategory
);
router.put(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
  categoryControllers.updateCategory
);
router.delete(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
  categoryControllers.deleteCategory
);

module.exports = router;