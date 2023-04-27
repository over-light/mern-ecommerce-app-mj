const AuthModel = require('./auth.model');

exports.createUser = async (user) => {
    const result = await AuthModel.create(user);
    return result;
};
exports.getById = async (id) => {
    const result = await AuthModel.findById(id);
    return result;
};
exports.getByField = async (id) => {
    const result = await AuthModel.findOne(id);
    return result;
};

exports.updateUser = async (data) => {
    const result = await AuthModel.updateOne(data);
    return result;
};
