const express = require('express');
const OrderControllers = require('./order.controller');
const checkAuth = require('../../middleware/check-auth');
const { ROLES } = require('../../constants');
const checklRole = require('../../middleware/check-role');

const router = express.Router();

// Add new Category
router.post(
    '/add',
    checkAuth,    
    OrderControllers.addOrder
 );
 router.get(
  '/me',
  checkAuth,    
  OrderControllers.getMyOrder
);
router.delete(
  '/cancel/:orderId',
  checkAuth,    
  OrderControllers.deleteOrder
);
router.put(
  '/status/item/:itemId',
  checkAuth,
  checklRole.check(ROLES.Admin),
  OrderControllers.updateStatus
);

 module.exports = router;