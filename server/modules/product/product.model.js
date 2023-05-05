const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = Schema.Types.ObjectId;

const productSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, required: true },
    price: { type: Number, require: true },
    owner: { type: ObjectID, ref: 'User', require: true },
    discount: { type: Number, require: false }
}, {
    timestamps: true
});
module.exports = mongoose.model('Product', productSchema);
