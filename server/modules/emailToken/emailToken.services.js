const EmailModel = require("./emailToken.model");

exports.createToken = async (token) => {
    return await EmailModel.create(token);
};

exports.findToken = async (token) => {
    return await EmailModel.findOne(token);
};
exports.deleteToken = async (data) => {
    return await EmailModel.deleteOne(data);
};
exports.updateOne = async (data) => {
    return await EmailModel.updateOne(data);
};
