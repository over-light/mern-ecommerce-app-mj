const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
module.exports = mongoose.model('Token', tokenSchema);
