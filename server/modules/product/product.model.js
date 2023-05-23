const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, required: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    category: { type: Schema.Types.ObjectId, require: true, ref: 'Category' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    discount: { type: Number, require: false }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Product', productSchema);
