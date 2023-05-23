const { validationResult } = require('express-validator');
const CategoryService = require('./category.service');
const { messageString } = require('./category.contant');

// Add new category

// eslint-disable-next-line consistent-return
exports.addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  const { name, description } = req.body;

  let existingCategory;

  try {
    existingCategory = await CategoryService?.getByField({ name });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }

  if (existingCategory) {
    return res.status(404).send({ message: messageString?.avaibleCategory });
  }

  try {
    const payload = {
      name,
      description
    };

    // Add new category
    const category = await CategoryService?.AddCategory(payload);
    res.status(201)?.json({ message: messageString?.categoryAddSuccess, category });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};

exports.getAllCategory = async (req, res) => {
  let category;
  try {
    category = await CategoryService.getAllCategory();
    res.status(200)?.json({ category });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};
// eslint-disable-next-line consistent-return
exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.cid;
  let product;

  try {
    product = await CategoryService.getById(categoryId);

    res.status(200)?.json({ product });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
  if (!product) {
    return res.status(404)?.json({ message: messageString.notFoundCategory });
  }
};

// eslint-disable-next-line consistent-return
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  const { name, description } = req.body;
  const categoryId = req.params.cid;
  let category;

  try {
    category = await CategoryService.getById(categoryId);
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
  if (category.name === name) {
    return res.status(404).send({ message: messageString?.avaibleCategory });
  }
  if (!category) {
    return res.status(404)?.json({ message: messageString.notFoundCategory });
  }
  try {
    const payload = {
      name,
      description
    };
    await CategoryService.updateCategory(payload);
    category = await CategoryService.getById(categoryId);

    res.status(200).json({ category });
  } catch (err) {
    res.status(500)?.json({ message: err?.message });
  }
};
// eslint-disable-next-line consistent-return
exports.deleteCategory = async (req, res) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await CategoryService.getById(productId);
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
    await CategoryService.deleteProduct(product.id);
  } catch (err) {
    return res.status(500)?.json({ message: err.message });
  }
  res.status(200).json({ message: messageString.categoryDeleted });
};
