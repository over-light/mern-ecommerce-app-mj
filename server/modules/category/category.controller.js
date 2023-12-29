const { validationResult } = require('express-validator');
const CategoryModel =require('./category.model');

// eslint-disable-next-line consistent-return
exports.addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'You must enter description & name.'});
  }
  const { name, description,isActive } = req.body;

  try{
    const category = new CategoryModel({
        name,
        description,
        isActive
      });

      const foundCategory = await CategoryModel.findOne({
        $or: [{ name }]
      });
      if (foundCategory && foundCategory?.name === name) {
        return res.status(400).json({ error: 'Slug is already in use.' });
      }

      // eslint-disable-next-line consistent-return
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
      }
    
    res.status(200).json({
      success: true,
          message: 'Category has been added successfully!',
          category: data
      });
     });
    }
    catch(err){
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

// eslint-disable-next-line consistent-return
exports.getCategory=async(req,res)=>{
  try {
    const categories = await CategoryModel.find({ isActive: true });
    res.status(200).json({
      categories
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

// eslint-disable-next-line consistent-return
exports.updateCategory=async(req,res)=>{
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const { slug } = req.body.category;

    const foundCategory = await CategoryModel.findOne({
      $or: [{ slug }]
    });
   
    if(!foundCategory){
      return res.status(400).json({
        error: 'Category is not found!'
      });
    }

    if (foundCategory && foundCategory?._id?.toString() !== categoryId) {
      return res.status(400).json({ error: 'Category not found!' });
    }

   await CategoryModel.findOneAndUpdate({_id: categoryId}, update);

   return res.status(200).json({
      success: true,
      message: 'Category has been updated successfully!'
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

// eslint-disable-next-line consistent-return
exports.deleteCategory=async(req, res)=>{
  try {
    const {id} = req.params;

    const foundCategory=await CategoryModel.findById(id);

    if(!foundCategory){
     return res.status(400).json({
        error: 'Category is not found!'
      });
    }

    const product = await CategoryModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: 'Category has been deleted successfully!',
      product
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};