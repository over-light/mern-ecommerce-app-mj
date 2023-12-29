const express = require('express');

const userRoutes = require('../../modules/user/user.route');
const productRoutes = require('../../modules/product/product.route');
const categoryRoutes = require('../../modules/category/category.route');
const brandRoutes = require('../../modules/brand/brand.route');
const orderRoutes = require('../../modules/order/order.route');

const router = express.Router();

router.use('/auth/',userRoutes);
router.use('/product/',productRoutes);
router.use('/category/',categoryRoutes);
router.use('/brand/',brandRoutes);
router.use('/order/',orderRoutes);

module.exports = router;
