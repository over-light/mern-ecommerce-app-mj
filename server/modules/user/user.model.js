const mongoose = require('mongoose');
const { ROLES } = require('../../constants');

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive:{
    type: Boolean,
    default:false
  },
  role: {
    type: String,
    default: ROLES.Member,
    enum: [ROLES.Admin, ROLES.Member]
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  activateAccountToken: { type: String },
  activateAccountExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
