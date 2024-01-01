const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto =require('crypto');
const { validationResult } = require('express-validator');
const { messageString } = require('./user.constant');
const UserModel = require('./user.model');
const sendEmail = require('../../utils/sendEmail');
const emailTemplate = require('../../utils/emailTemplate');
const { BASE_URL,TOKEN_LIFE,TOKEN_KEY } = require('../../config/env');

// eslint-disable-next-line consistent-return
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }

  const { email, firstName, lastName, password ,mobile} = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: messageString?.emailAlreadyUse });
    }
  } catch (err) {
    return res.status(500).json({ message: messageString?.signupFailed });
  }

try{
  const activateAccountToken = crypto.randomBytes(64).toString('hex');
  const activateAccountExpires=Date.now() + 3600000;

  const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new UserModel({
      email,
      password:hash,
      firstName,
      lastName,
      mobile,
      activateAccountToken,
      activateAccountExpires
    });

    const registeredUser = await user.save();

    const url = `${BASE_URL}/user/${user._id}/verify/${activateAccountToken}`;
    await sendEmail(
      user.email,
      messageString?.activateAccount,
      url,
      emailTemplate.verifyAccount(url)
    );

    res.status(200).json({
      success: true,
      message:messageString?.registerSuccess,
      user: {
        id: registeredUser.id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        mobile:registeredUser.mobile,
        role: registeredUser.role
      }
    });
    
}
catch(err)
{
  res.status(500).json({
    error: err
  });
}

};

// eslint-disable-next-line consistent-return
exports.login=async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs});
  }
  
  const { email, password } = req.body;
  let user;
  try{
    user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: messageString?.noUserFound });
    }
    if(!user.isActive){
      return res
        .status(400)
        .send({ message:messageString?.accountNotActive });
    }
  }
  catch(err){
    res.status(400).json({
      message: messageString?.requestNotProceed
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  try{
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: messageString?.invalidCredenatial
      });
    }
  }
  catch(err){
    return res.status(400).json({
      success: false,
      message: messageString?.invalidCredenatial
    });
  }

  try{

    const payload = {
      userId: user.id,
      email: user.email,
      role:user.role
    };
  
    const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: TOKEN_LIFE });

    if (!token) {
      throw new Error();
    }
    
    res.status(200).json({
      success: true,
      message:messageString?.loginSuccess,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token
      }
    });
  }
  catch(err){
    res.status(500).json({
      message: messageString?.requestNotProceed
    });
  }
};

// eslint-disable-next-line consistent-return
exports.forgot = async(req,res)=>{
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: messageString?.invalidInputs });
  }
  
  const { email } = req.body;
  let  existingUser;

  try{
    existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    return res
      .status(400)
      .send({ message: messageString?.noUserFound });
  }
  
  if(!existingUser.isActive){
    return res
      .status(400)
      .send({ message: messageString?.accountNotActive});
  }
}
  catch(err){
  res.status(400).json({
    error: err
  });
  }

  try{
    
    const resetToken = crypto.randomBytes(64).toString('hex');

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + 3600000;

    existingUser.save();
    
    const url = `${BASE_URL}/user/${existingUser._id}/update-password/${resetToken}`;

    await sendEmail(
      existingUser.email,
      'Forgot your password',
      url,
      emailTemplate.forgotPassword(url)
    );

    res.status(200).json({
      success: true,
      message: messageString?.resetPasswordLinkMeesage
    });
  }
  catch(err){
    res.status(400).json({
      message: err
    });
  }
};

// eslint-disable-next-line consistent-return
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: messageString?.passwordrequired });
    }

    const resetUser = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!resetUser) {
      return res.status(400).json({
        message:
          messageString?.tokenExpired
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    resetUser.password = hash;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    resetUser.save();

    await sendEmail(
      resetUser.email,
      messageString?.successPassword,
      '',
      emailTemplate.passwordUpdated(messageString?.successPassword)
    );

    res.status(200).json({
      success: true,
      message:messageString?.passwordUpdatedSuccess
    });

  } catch (err) {
    res.status(400).json({
      message: messageString?.requestNotProceed
    });
  }
};

// eslint-disable-next-line consistent-return
exports.verifyUser = async (req, res) => {
  let user;
  const {token}=req.params;
  try {
    // Find user
    user = await UserModel.findOne({
      activateAccountToken: token,
      activateAccountExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: messageString?.inValidLink });
    }

    if(user.isActive){
      return res.status(400).json({ message: messageString?.userExist });
    }

    user.activateAccountToken = undefined;
    user.activateAccountExpires = undefined;
    user.isActive=true;
    user.save();

    await sendEmail(
      user.email,
      messageString?.accountActivated,
      '',
      emailTemplate.accountActivated()
    );
    res.status(200).json({ message: messageString?.userVerifySuccess });

  } catch (err) {
    return res.status(400).json({ message:messageString?.requestNotProceed});
  }
  
};