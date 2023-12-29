const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../../middleware/file-upload');
const productControllers = require('./product.controller');
const checkAuth = require('../../middleware/check-auth');
const checklRole = require('../../middleware/check-role');
const { ROLES } = require('../../constants');

const router = express.Router();

// Add new product
router.post(
    '/add',
    fileUpload.single('image'),
    checkAuth,
    checklRole.check(ROLES.Admin),
    [
      check('sku').not().isEmpty(),
      check('description').not().isEmpty(),
      check('name').not().isEmpty(),
      check('price').not().isEmpty(),
      check('isActive').not().isEmpty(),
      check('brand').not().isEmpty(),
    ],
    productControllers.addProduct
);

router.get(
  '/list',
  productControllers.getProduct
);

router.get(
  '/item/:slug',
  productControllers.getProductBySlug
);

router.put(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
    [
      check('sku').not().isEmpty(),
      check('description').not().isEmpty(),
      check('name').not().isEmpty(),
      check('price').not().isEmpty(),
      check('isActive').not().isEmpty(),
      check('brand').not().isEmpty(),
    ],
  productControllers.updateProduct
);

router.delete(
  '/:id',
  checkAuth,
  checklRole.check(ROLES.Admin),
  productControllers.deleteProduct
);

module.exports = router;