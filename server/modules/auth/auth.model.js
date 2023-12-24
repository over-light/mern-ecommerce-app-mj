const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    password: { type: String, required: true, minlength: 6 },
    isActive: { type: Boolean, required: false },
    isAdmin: { type: Boolean, required: false },
    __v: { type: Number, select: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
