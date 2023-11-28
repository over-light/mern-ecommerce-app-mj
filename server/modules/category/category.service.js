const CategoryModel = require('./category.model');

exports.getAllCategory = async (pageNumber, pageSize, sortOptions, searchQuery) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  const totalCategory = await CategoryModel.countDocuments(searchQuery);

  const result = await CategoryModel.find(searchQuery)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize);

  return { result, totalCategory };
};
exports.AddCategory = async (payload) => {
  const result = await CategoryModel.create(payload);
  return result;
};
exports.getById = async (id) => {
  const result = await CategoryModel.findById(id);
  return result;
};
exports.getByField = async (id) => {
  const result = await CategoryModel.findOne(id);
  return result;
};

exports.updateCategory = async (data) => {
  const result = await CategoryModel.updateOne(data);
  return result;
};
exports.deleteCategoryProduct = async (id) => {
  const result = await CategoryModel.findByIdAndRemove(id);
  return result;
};

