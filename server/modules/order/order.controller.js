const { caculateItems } = require('../../utils/commonFunctions');
const OrderModel =require('./order.model');
const ProductModel =require('../product/product.model');
const { CART_ITEM_STATUS } = require('../../constants');
const { messageString } = require('./order.constant');

// Decrease quantity from product
const decreaseQuantity = products => {
  // console.log("availableProduct",products)
  let bulkOptions = products.map(item => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    }));

  ProductModel.bulkWrite(bulkOptions);
};

// Increase quantity from product
const increaseQuantity = products => {
  let bulkOptions = products.map(item => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: item.quantity } }
      }
    }));

    ProductModel.bulkWrite(bulkOptions);
};

const checkProductsAvailability=async(items)=>{
  let products=[];
  try{
    const productIds = items.map(item => item.product); 

    products=await ProductModel.find({ 
      _id: {
          $in: productIds
      }
  }).then(res=> res)
  .catch(err=>new Error(err.message));

    if(!products.length){
      return products;
    }

    // eslint-disable-next-line array-callback-return, consistent-return
    const availableProducts = products.map(product => {
      const item = items.find(order => order.product === product._id.toString());

      if (product.quantity > 0 && item.quantity <= product.quantity) {
        return item;
      }
    });
    return availableProducts;
  }
  catch(err){
    throw new Error(err);
  }
  
};

// eslint-disable-next-line consistent-return
exports.addOrder = async (req, res) => {
    const items=req.body.products;
    const {userId}= req.userData;

    let products;
    try{
      // Check if all products are available in the database
      products  = await checkProductsAvailability(items);

      if(!products.length){
        return res.status(404).json({
          message: messageString?.productNotFound
        });
      }
    }
    catch(err){
      res.status(400).json({
        message: messageString?.requestNotProceed
      });
    }

    let lastOrder;
    try {   
      const availableProduct = caculateItems(products);

      const total = availableProduct.reduce((acc, product) => acc + product.totalPrice, 0);
      const order = new OrderModel({
        products,
        user:userId,
        total
      });

      const orderDoc = await order.save();

      await decreaseQuantity(availableProduct);

      lastOrder = await OrderModel.findById(orderDoc._id)
      .sort('-created')
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'name description imageUrl sku slug', 
          populate: [
            {
              path: 'brand',
              select: 'name description' 
            },
            {
              path: 'category',
              select: 'name description'
            }
          ]
        }
      });
  
      const newOrder = {
        _id: orderDoc._id,
        created: orderDoc.created,
        total: orderDoc.total,
        products: lastOrder.products
      };
  
      res.status(200).json({
        success: true,
        message: messageString?.orderSuccess,
        result:newOrder
      });
    } catch (err) {
      res.status(400).json({
        message: messageString?.requestNotProceed
      });
    }
};

exports.getMyOrder=async(req, res)=>{
  try {
    const { page = 1, limit = 10 } = req.query;
    const user = req.userData.userId;
    const query = { user };

    const orders = await OrderModel.find(query)
      .sort('-created')
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'name description imageUrl sku slug created', 
          populate: [
            {
              path: 'brand',
              select: 'name description' 
            },
            {
              path: 'category',
              select: 'name description'
            }
          ]
        }
      });
      
    const count = await OrderModel.countDocuments(query);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (err) {
    res.status(400).json({
      message: messageString?.requestNotProceed
    });
  }
};

exports.deleteOrder=async(req,res)=>{

  try {
    const {orderId} = req.params;

    const order = await OrderModel.findOne({ _id: orderId });

    if(!order){
      return res.status(404).json({
        success: false,
        error: messageString?.orderNotFound
      });
    }
    increaseQuantity(order.products);

    await OrderModel.findOneAndRemove({ _id: orderId });

    return res.status(200).json({
      success: true,
      message:messageString?.orderCancelSucces
    });
  } catch (err) {
    return res.status(400).json({
      message: messageString?.requestNotProceed
    });
  }
};

exports.updateStatus=async(req,res)=>{
  try {
    const { itemId } = req.params;
    const { orderId } = req.body;
  
    const status = req.body.status || CART_ITEM_STATUS.Cancelled;
  
    const foundOrder = await OrderModel.findOne({ '_id': itemId });
  
    if (!foundOrder) {
      return res.status(404).json({
        message: messageString?.orderNotFound,
      });
    }
  
    const foundCartProduct = foundOrder.products.find(p => p._id.toString() === orderId);
  
    if (!foundCartProduct) {
      return res.status(404).json({
        error: messageString?.productNotFoundThisOrder,
      });
    }
  
    await OrderModel.updateOne(
      { 'products._id': orderId }, 
      { $set: { 'products.$.status': status } }
    );
    
    if (status === CART_ITEM_STATUS.Cancelled && foundCartProduct.status!==CART_ITEM_STATUS.Cancelled) {
      await ProductModel.updateOne(
        { _id: foundCartProduct.product },
        { $inc: { quantity: foundCartProduct.quantity } }
      );
    }
  
    return res.status(200).json({
      success: true,
      message: messageString?.orderStatusUpdate
    });
  } catch (err) {
    return res.status(400).json({
      message: messageString?.requestNotProceed,
      err 
    });
  }
  
};

