
const express = require('express');
const app = express();
const authRoute = require('../modules/auth/auth.route');

const RouteLoader = () => {
    app.use('/api', authRoute);
}
exports.RouteLoader = RouteLoader;