const crypto = require('crypto');
const emailToken = require('./emailToken.services');

exports.createToken = async (user) => {
  const result = await emailToken?.createToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex'),
  });
  return result;
};

exports.findToken = async (user) => {
  // Create new Token
  const result = await emailToken?.findToken(user);
  return result;
};

exports.deleteToken = async (token) => {
  const result = await emailToken?.deleteToken(token);
  return result;
};
exports.updateOne = async (token) => {
  const result = await emailToken?.updateOne(token);
  return result;
};
