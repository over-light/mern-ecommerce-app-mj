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
    check('mobile')
      .not()
      .isEmpty(),
    check('email')
      .isEmail()
      .not()
      .isEmpty(),
  ],
], userControllers.signup);

router.post('/login', [
  [
    check('email')
      .isEmail()
      .not()
      .isEmpty(),
    check('password')
      .not()
      .isEmpty(),
  ],
], userControllers.login);

router.post('/forgot-password', [
  [
    check('email')
    .isEmail()
    .not()
    .isEmpty()
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
