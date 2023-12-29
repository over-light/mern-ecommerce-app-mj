const express = require('express');
const { check } = require('express-validator');
const brandController = require('./brand.controller');
const checkAuth = require('../../middleware/check-auth');
const checklRole = require('../../middleware/check-role');
const { ROLES } = require('../../constants');

const router = express.Router();

// Add new Brand
router.post(
  '/add',
  checkAuth,
  checklRole.check(ROLES.Admin),
  [check('name').not().isEmpty(), check('description').not().isEmpty()],
  brandController.addBrand
);

router.get(
  '/list',
  brandController.getBrands
);

router.put(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
  brandController.updateBrand,
);

router.delete(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
  brandController.deleteBrand,
);
module.exports = router;