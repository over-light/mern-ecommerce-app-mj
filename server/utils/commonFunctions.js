const crypto = require('crypto');

exports.generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');