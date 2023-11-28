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

// Populate
exports.getPopulateAllProducts = async (pageNumber, pageSize, sortOptions, searchQuery) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  const totalProducts = await ProductModel.countDocuments(searchQuery);

  const result = await ProductModel.find(searchQuery)
    .populate('category', 'name description')
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize);

  return { result, totalProducts };
};
exports.getByPopulateId = async (id) => {
  const result = await ProductModel.findById(id).populate('category', 'name description');
  return result;
};
