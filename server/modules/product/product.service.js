const ProductModel = require('./product.model');

exports.getAllProducts = async () => {
    const result = await ProductModel.find();
    return result;
};
exports.AddProduct = async (payload) => {
    const result = await ProductModel.create(payload);
    return result;
};
exports.getById = async (id) => {
    const result = await ProductModel.findById(id);
    return result;
};
exports.getByField = async (id) => {
    const result = await ProductModel.findOne(id);
    return result;
};

exports.updateProduct = async (data) => {
    const result = await ProductModel.updateOne(data);
    return result;
};
exports.deleteProduct = async (id) => {
    const result = await ProductModel.findByIdAndRemove(id);
    return result;
};

