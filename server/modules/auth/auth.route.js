const express = require('express');
const { check } = require('express-validator');
const userControllers = require('./auth.controller');

const router = express.Router();

//Create new account 
router.post('/auth/signup', [
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

router.get('/user/:id/verify/:token', userControllers.verifyUser);

module.exports = router;