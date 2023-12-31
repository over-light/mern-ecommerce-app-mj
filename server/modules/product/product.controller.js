const { validationResult } = require('express-validator');
const ProductModule=require('./product.model');
const { s3Upload,S3DeleteObject } = require('../../models/s3');
const { generateFileName, ProductPagination } = require('../../utils/commonFunctions');
const { MIME_TYPE_MAP } = require('../../constants');
const BrandModel =require('../brand/brand.model');
const CategoryModel =require('../category/category.model');

// eslint-disable-next-line consistent-return
exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message:errors });
    }
  
    const { sku, name, description, quantity ,price,isActive,brand,category} = req.body;

    const image = req.file;
    try {   
        const foundProduct = await ProductModule.findOne({ sku });
      
        if (foundProduct) {
          return res.status(400).json({ message: 'This product is already in use.' });
        }
  
        const findBrand=await BrandModel.findById(brand);

        if (!findBrand) {
          return res.status(400).json({ message: 'Brand not found' });
        }

        const findCategory=await CategoryModel.findById(category);

        if (!findCategory) {
          return res.status(400).json({ message: 'Category not found' });
        }

        const fileName = `${generateFileName()}.${MIME_TYPE_MAP[req?.file.mimetype]}`;

        const { imageUrl, imageKey } = await s3Upload(image,fileName);

        const product = new ProductModule({
          sku,
          name,
          description,
          quantity,
          price,
          isActive,
          brand,
          imageUrl,
          imageKey,
          category,
          user:req.userData.userId
        });
  
        const savedProduct = await product.save();
  
        res.status(200).json({
          success: true,
          message: 'Product has been added successfully!',
          product: savedProduct
        });
      } catch (error) {
        return res.status(400).json({
          message:error
        });
      }
};

exports.getProduct = async (req, res) => {
  const { currentPage, limit, sortOptions, filters } = ProductPagination(req.query);
  const skipAmount = (currentPage - 1) * limit;
  try {
    const totalProducts = await ProductModule.countDocuments(filters);
    const result = await ProductModule.find(filters)
    .select('name description price imageUrl sku slug')
    .populate('category', 'name description')
    .populate('brand', 'name description')
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(limit);

    res.status(200)?.json({
      pagination: {
        count: totalProducts,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit)
      },
      products: result
    });
    
  } catch (err) {
    res.status(400).json({
      message: 'Your request could not be processed. Please try again.',err
    });
  }
};

// eslint-disable-next-line consistent-return
exports.getProductBySlug=async(req,res)=>{
  try { 
    const {slug} = req.params;

    const productDoc = await ProductModule.findOne({ slug, isActive: true,}).select('name description price imageUrl quantity sku slug')
    .populate('category', 'name description')
    .populate('brand', 'name description');

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (err) {
    res.status(400).json({
      message: 'Your request could not be processed. Please try again.',err
    });
  }
};

// eslint-disable-next-line consistent-return
exports.updateProduct=async(req,res)=>{
  try {
    const productId = req.params.id;
    const update = req.body.product;
    const query = { _id: productId };
  
  const product=  await ProductModule.findOneAndUpdate(query, update, {
      new: true
    });
    
    if(!product){
      return res.status(400).json({
         error: 'Product is not found'
       });
     }

    res.status(200).json({
      success: true,
      message: 'Product has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      message: 'Your request could not be processed. Please try again.'
    });
  }
};

// eslint-disable-next-line consistent-return
exports.deleteProduct=async(req,res)=>{
  try {
    const product = await ProductModule.findByIdAndDelete({ _id: req.params.id });
    
    if(!product){
      return res.status(400).json({
        message: 'Product is not found'
       });
     }

   await S3DeleteObject(product.imageKey);

    res.status(200).json({
      success: true,
      message: 'Product has been deleted successfully!',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Your request could not be processed. Please try again.'
    });
  }
};