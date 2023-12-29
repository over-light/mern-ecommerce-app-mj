const express = require('express');
const { check } = require('express-validator');
const userControllers = require('./user.controller');

const router = express.Router();

// Create new account
router.post('/signup', [
  [
    check('firstName')
      .not()
      .isEmpty(),
    check('lastName')
      .not()
      .isEmpty(),
    check('password')
      .not()
      .isEmpty(),
    check('phoneNumber')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
  ],
], userControllers.signup);

router.post('/login', [
  [
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password')
      .not()
      .isEmpty(),
  ],
], userControllers.login);

router.post('/forgot', [
  [
    check('email')
      .normalizeEmail()
      .isEmail()
  ],
], userControllers.forgot);

router.post('/reset/:token', [
  [
    check('password')
    .not()
    .isEmpty(),
  ],
], userControllers.resetPassword);

router.get('/verify-user/:id/verify/:token', userControllers.verifyUser);

module.exports = router;
