const EmailModel = require("./emailToken.model");

exports.createToken = async (token) => {
    return await EmailModel.create(token);
};

exports.findToken = async (token) => {
    return await EmailModel.findOne(token);
};
exports.delete = async (data) => {
    return await EmailModel.deleteOne(data);
};