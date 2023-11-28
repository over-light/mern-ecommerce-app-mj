const { validationResult } = require('express-validator');
const CartService = require('./cart.service');
const { messageString } = require('./cart.constant');
const ProductService = require('../product/product.service');

// eslint-disable-next-line consistent-return
exports.addItemInCatrt = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }

  const { id,quantity} = req.body;

  let product;

  // Get product by id
  try {
    product = await ProductService.getByField({id});
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
 
  if (!product) {
    return res.status(404)?.json({ message: messageString.notFoundProduct });
  }

  const payload={
    quantity,
    productId:id,
    userId:req.userData.userId
  };
 
  try {
  CartService.AddItemOnCart(payload);
  }
  catch(err) {
    res.status(500)?.json({ message: err?.message });
  }
  res.status(200).json({ 'message': messageString.cartAdded});
};

// eslint-disable-next-line consistent-return
exports.getAllCartItems = async (req, res) => {
 
  try {
    const {userId} = req.userData;
    const result = await CartService?.getAllCartItemTest({userId });
  
    let product;

    // eslint-disable-next-line consistent-return
    const payload=  result.map(async(pro,index)=>{
      product= await ProductService.getById(pro?.productId);
     return {
      id:result[index]._id,
      productId:product?._id,
      name:product.name,
      price:product.price,
      quantity:result[index].quantity,
     };
     
    });

    res.status(200)?.json({
      cartItems: await Promise.all(payload)
    });
    
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};

// eslint-disable-next-line consistent-return
exports.updateCart=async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }

  const { quantity} = req.body;
  const { cid }=req.params;

  let cartItem;
  
  try {
    cartItem = await CartService.getById(cid);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }

  if (!cartItem) {
    return res.status(404)?.json({ message: messageString.notFoundCartItem });
  }

  try{
    // Update cart value
  await CartService.updateCart({quantity});
  // Get updated value
  cartItem = await CartService.getById(cid);
  res.status(200).json({ cartItem });
  
} catch (err) {
  res.status(500)?.json({ message: err?.message });
}

};