const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../config/env');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN';      
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        next();
    }
};