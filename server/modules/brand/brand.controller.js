const { validationResult } = require('express-validator');
const BrandModel =require('./brand.model');

// eslint-disable-next-line consistent-return
exports.addBrand = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'You must enter description & name.'});
  }
  const { name, description,isActive } = req.body;

  try{
    const category = new BrandModel({
        name,
        description,
        isActive
      });

      const foundCategory = await BrandModel.findOne({
        $or: [{ name }]
      });

      if (foundCategory && foundCategory?.name === name) {
        return res.status(400).json({ message: 'Slug is already in use.' });
      }

      // eslint-disable-next-line consistent-return
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Your request could not be processed. Please try again.'
        });
      }
    
    res.status(200).json({
      success: true,
          message: 'Brand has been added successfully!',
          category: data
      });
     });
    }
    catch(err){
        return res.status(400).json({
          message: 'Your request could not be processed. Please try again.'
        });
    }
};

// eslint-disable-next-line consistent-return
exports.getBrands=async(req,res)=>{
  try {
    const categories = await BrandModel.find({ isActive: true });
    res.status(200).json({
      categories
    });
  } catch (error) {
    res.status(400).json({
      message: 'Your request could not be processed. Please try again.'
    });
  }
};

// eslint-disable-next-line consistent-return
exports.updateBrand=async(req,res)=>{
  try {
    const brandId = req.params.id;
    const update = req.body.brand;

   const foundBrand=await BrandModel.findOneAndUpdate({_id: brandId}, update);
  
   if(!foundBrand){
    return res.status(400).json({
      message: 'Brand is not found!'
     });
   }
   
   return res.status(200).json({
      success: true,
      message: 'Brand has been updated successfully!'
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Brand is not found!',
    });
  }
};

// eslint-disable-next-line consistent-return
exports.deleteBrand=async(req, res)=>{
  try {
    const brandId = req.params.id;

    const foundBrand=await BrandModel.findByIdAndDelete({_id: brandId});

    if(!foundBrand){
     return res.status(400).json({
      message: 'Brand is not found!'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Brand has been deleted successfully!',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Your request could not be processed. Please try again.'
    });
  }
};