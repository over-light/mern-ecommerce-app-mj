
const AuthModel = require("./auth.model");
exports.createUser = async (user) => {
    return await AuthModel.create(user);
};
exports.getById = async (id) => {
    return await AuthModel.findById(id);
};
exports.getByField = async (id) => {
    return await AuthModel.findOne(id);
};

exports.updateUser = async (data) => {
    return await AuthModel.updateOne(data);
}