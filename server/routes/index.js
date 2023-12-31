const express = require('express');
const v1Routes = require('./v1');
const { BASE_API_URL } = require('../config/env');

const router = express.Router();

router.use(BASE_API_URL, v1Routes);

module.exports = router;