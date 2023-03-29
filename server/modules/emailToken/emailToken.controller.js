const emailToken = require('./emailToken.services');
const crypto = require('crypto');


exports.createToken = async (user) => {
    //Create new Token
    return await emailToken?.createToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    })
}

exports.findToken = async (user) => {
    //Create new Token
    return await emailToken?.findToken(user)
}

exports.deleteToken = async (token) => {
    return await emailToken?.delete(token)
}