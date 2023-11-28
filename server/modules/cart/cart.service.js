const cartModel = require('./cart.model');
const CartModel = require('./cart.model');

exports.getAllCartItem = async () => {
  const result = await CartModel.find();
  return result;
};
exports.getAllCartItemTest = async (id) => {
  const result = await CartModel.find(id);
  return result;
};
exports.AddItemOnCart = async (payload) => {
  const result = await CartModel.create(payload);
  return result;
};
exports.getById = async (id) => {
  const result = await CartModel.findById(id,'-createdAt -updatedAt').lean();
  return result;
};
exports.getByField = async (id) => {
  const result = await CartModel.findOne(id);
  return result;
};

exports.updateCart = async (data) => {
  const result = await CartModel.updateOne(data);
  return result;
};
exports.deleteCartItem = async (id) => {
  const result = await CartModel.findByIdAndRemove(id);
  return result;
};

exports.getAllCartItem = async (pageNumber, pageSize, sortOptions, searchQuery) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  const totalCategory = await cartModel.countDocuments(searchQuery);

  const result = await CartModel.find(searchQuery)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize);

  return { result, totalCategory };
};
