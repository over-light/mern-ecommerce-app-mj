const jwt = require('jsonwebtoken');
const AuthService = require('../modules/auth/auth.service');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {

        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN';     

        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const { userId } = decodedToken;

        try {
            const user = await AuthService?.getById(userId);
            if (!user) {
                throw new Error('Authentication failed!');
            }

            req.userData = { userId: user?._id };

        } catch (err) {
            console.log(err?.message);
            throw new Error('Authentication failed!');
        }
        next();
    } catch (err) {
        return res.status(401)?.json({ message: 'Authentication failed!' });
    }
};