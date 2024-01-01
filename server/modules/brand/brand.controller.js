const { validationResult } = require('express-validator');
const BrandModel =require('./brand.model');
const { messageString } = require('./brand.constant');

// eslint-disable-next-line consistent-return
exports.addBrand = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.nameAndDescriptionRequired});
  }
  const { name, description,isActive } = req.body;

  try{
    const foundBrand = await BrandModel.findOne({
      $or: [{ name }]
    });

    if (foundBrand && foundBrand?.name === name) {
      return res.status(400).json({ message: messageString?.slugAlreadyInUser });
    }

    const brand = new BrandModel({
        name,
        description,
        isActive
      });

      // eslint-disable-next-line consistent-return
      brand.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: messageString?.requestNotProceed
        });
      }
    
    res.status(200).json({
      success: true,
          message: messageString?.brandAddSuccess,
          brand: data
      });
     });
    }
    catch(err){
        return res.status(400).json({
          message: messageString?.requestNotProceed
        });
    }
};

// eslint-disable-next-line consistent-return
exports.getBrands=async(req,res)=>{
  try {
    const brands = await BrandModel.find({ isActive: true });
    res.status(200).json({
      brands
    });
  } catch (error) {
    res.status(400).json({
      message: messageString?.requestNotProceed
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
      message: messageString?.brandNotFound
     });
   }
   
   return res.status(200).json({
      success: true,
      message: messageString?.brandUpdateSuccess
    });
  } catch (err) {
    return res.status(400).json({
      message: messageString?.brandNotFound,
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
      message: messageString?.brandNotFound
      });
    }
    
    return res.status(200).json({
      success: true,
      message: messageString?.brandDeleteSuccess,
    });
  } catch (error) {
    return res.status(400).json({
      message: messageString?.requestNotProceed
    });
  }
};