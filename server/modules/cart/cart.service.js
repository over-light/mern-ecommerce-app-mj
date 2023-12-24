const CartModel = require('./cart.model');

exports.getAllCartItems = async (userId) => {
  const result = await CartModel.find({ userId }).populate('productId','name description image price');
  return result;
};

exports.AddItemOnCart = async (payload) => {
  const result = await CartModel.create(payload);
  return result;
};
exports.getById = async (id) => {
  const result = await CartModel.findById(id);
  return result;
};
exports.getByField = async (id) => {
  const result = await CartModel.findOne(id);
  return result;
};

exports.updateCart = async (payload) => {
  const { id, quantity } = payload; 
  const result = await CartModel.findByIdAndUpdate(id,
    { $set: { quantity } }, 
  );
  return result;
};                      

exports.deleteCartItem = async (id) => {
  const result = await CartModel.findByIdAndRemove(id);
  return result;
};
