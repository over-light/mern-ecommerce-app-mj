const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Category', categorySchema);
