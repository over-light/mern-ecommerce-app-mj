const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    quantity: { type: Number, require: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Cart', cartSchema);
