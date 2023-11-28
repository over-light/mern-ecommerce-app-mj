const { validationResult } = require('express-validator');
const { messageString, MIME_TYPE_MAP } = require('./product.constant');
const ProductService = require('./product.service');
const CategoryService = require('../category/category.service');
const { uploadFile, deleteObject } = require('../../models/s3');
const { generateFileName, ValidatePagination } = require('../../utils/commonFunctions');

// Add new Product

// eslint-disable-next-line consistent-return
exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  const { name, description, price, category } = req.body;

  let checkCategory;
  try {
    checkCategory = await CategoryService.getById(category);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }

  if (!checkCategory) {
    return res.status(404)?.json({ message: messageString.notFoundCategory });
  }

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
  const { currentPage, limit, sortOptions, searchQuery } = ValidatePagination(req.query);

  let products;

  try {
    const { result, totalProducts } = await ProductService.getPopulateAllProducts(
      currentPage,
      limit,
      sortOptions,
      searchQuery
    );

    products = await result?.map(async (product) => ({
      url: product.image,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      discount: product.discount,
      id: product._id
    }));

    res.status(200)?.json({
      pagination: {
        count: totalProducts,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit)
      },
      products: await Promise.all(products)
    });
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

  try {
    await deleteObject(product?.image);

    await ProductService.deleteProduct(product.id);
  } catch (err) {
    return res.status(500)?.json({ message: err.message });
  }

  if (String(product.owner) !== String(req.userData.userId)) {
    return res.status(401)?.json({ message: messageString.notAllowed });
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
