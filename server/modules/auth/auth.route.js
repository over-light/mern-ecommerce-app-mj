const express = require('express');
const { check } = require('express-validator');
const userControllers = require('./auth.controller');

const router = express.Router();

// Create new account
router.post('/signup', [
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 }),
    check('mobile').not()
      .isEmpty()
      .isLength({ min: 10, max: 13 }),
  ],
], userControllers.signup);

router.get('/verify-user/:id/verify/:token', userControllers.verifyUser);
router.post('/forgot-password', userControllers.forgotPassword);
router.post('/login', userControllers.login);
router.post('/update-password', userControllers.updatePassword);
module.exports = router;
