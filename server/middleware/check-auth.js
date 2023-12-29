const jwt = require('jsonwebtoken');
const userModel = require('../modules/user/user.model');
const {TOKEN_KEY} = require('../config/env');

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
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const { userId } = decodedToken;

        try {
            const user = await userModel?.findById(userId);
            if (!user) {
                throw new Error('Authentication failed!');
            }

            req.userData = { userId: user?._id ,role:user?.role,email:user.email,name:`${user.firstName} ${user.lastName}`};
        } catch (err) {
            console.log(err?.message);
            throw new Error('Authentication failed!');
        }
        next();
    } catch (err) {
        return res.status(401)?.json({ message: 'Authentication failed!' });
    }
};