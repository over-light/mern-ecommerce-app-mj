const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
<<<<<<< HEAD
    // username: { type: String, required: true, unique: true },
=======
    username: { type: String, required: true, unique: true },
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    mobile: { type: Number, required: true, minlength: 10 },
    isActive: { type: Boolean, required: false, },
    isAdmin: { type: Boolean, required: false, },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)