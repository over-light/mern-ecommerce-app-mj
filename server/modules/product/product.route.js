const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../../middleware/file-upload');
const productControllers = require('./product.controller');
const checkUser = require('../../middleware/check-user');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();
// Get userId if user is loggedIn
router.use(checkUser);

// Add new product
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    check('price').not().isEmpty()
  ],
  checkAuth,
  productControllers.addProduct
);

router.get('/', productControllers.getAllProducts);
router.get('/:pid', productControllers.getProductByID);
router.delete('/:pid', checkAuth, productControllers.deleteProducts);
router.patch(
  '/:pid',
  [
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    check('price').not().isEmpty(),
    check('category').not().isEmpty()
  ],
  checkAuth,
  productControllers.updateProducts
);
module.exports = router;
