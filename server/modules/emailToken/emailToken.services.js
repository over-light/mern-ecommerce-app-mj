const EmailModel = require('./emailToken.model');

exports.createToken = async (token) => EmailModel.create(token);

exports.findToken = async (token) => {
    const result = await EmailModel.findOne(token);
    return result;
};
exports.deleteToken = async (data) => {
    const result = await EmailModel.deleteOne(data);
    return result;
};
exports.updateOne = async (data) => {
    const result = await EmailModel.updateOne(data);
    return result;
};
