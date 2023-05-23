const { validationResult } = require('express-validator');
const { messageString, MIME_TYPE_MAP } = require('./product.constant');
const ProductService = require('./product.service');

const { uploadFile, deleteObject } = require('../../models/s3');
const { generateFileName } = require('../../utils/commonFunctions');

// Add new Product

// eslint-disable-next-line consistent-return
exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  const { name, description, price, category } = req.body;

  const fileName = `${generateFileName()}.${MIME_TYPE_MAP[req?.file.mimetype]}`;

  try {
    const url = await uploadFile(req, res, fileName);
    const payload = {
      name,
      description,
      price,
      image: url.Location,
      discount: 0,
      category,
      owner: req.userData.userId
    };

    // Add new product
    const product = await ProductService?.AddProduct(payload);
    res.status(201)?.json({ message: messageString?.productAddSuccess, product });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};

exports.getAllProducts = async (req, res) => {
  let products;
  try {
    products = await ProductService.getPopulateAllProducts();

    products = await products?.map(async (product) => ({
      url: product.image,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      discount: product.discount,
      id: product._id
    }));
    res.status(200)?.json({ products: await Promise.all(products) });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};

// eslint-disable-next-line consistent-return
exports.getProductByID = async (req, res) => {
  const productId = req.params.pid;
  let product;

  try {
    product = await ProductService.getByPopulateId(productId);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
  if (!product) {
    return res.status(404)?.json({ message: messageString.notFoundProduct });
  }

  res.status(200)?.json({ product });
};

// eslint-disable-next-line consistent-return
exports.deleteProducts = async (req, res) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await ProductService.getById(productId);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
  if (!product) {
    return res.status(404)?.json({ message: messageString.notFoundProduct });
  }
  console.log('product.owner', product?.owner, '========', req?.userData?.userId);
  if (String(product.owner) !== String(req.userData.userId)) {
    return res.status(401)?.json({ message: messageString.notAllowed });
  }

  try {
    await deleteObject(product?.image);

    await ProductService.deleteProduct(product.id);
  } catch (err) {
    return res.status(500)?.json({ message: err.message });
  }
  res.status(200).json({ message: messageString.productDeleted });
};

// eslint-disable-next-line consistent-return
exports.updateProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  const { name, description, price, category, discount } = req.body;
  const productId = req.params.pid;
  let product;

  try {
    product = await ProductService.getByPopulateId(productId);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
  if (!product) {
    return res.status(404)?.json({ message: messageString.notFoundProduct });
  }
  if (String(product.owner) !== String(req.userData.userId)) {
    return res.status(401)?.json({ message: messageString.notAllowed });
  }

  try {
    const payload = {
      name,
      description,
      price,
      category,
      discount: discount || product.discount
    };
    await ProductService.updateProduct(payload);
    product = await ProductService.getByPopulateId(productId);

    res.status(200).json({ product });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};
