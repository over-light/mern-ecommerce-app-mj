const dotenv = require('dotenv');

dotenv.config();

exports.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
exports.SERVER_PORT = process.env.SERVER_PORT;
exports.DB_USER_NAME = process.env.DB_USER_NAME;
exports.DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
exports.DB_NAME = process.env.DB_NAME;
exports.BASE_URL = process.env.BASE_URL;
exports.CLUSTER_URL = process.env.CLUSTER_URL;
exports.TOKEN_KEY = process.env.TOKEN_KEY;
exports.IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
exports.REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_ACCESS_KEY_SECRET = process.env.AWS_ACCESS_KEY_SECRET;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
exports.AWS_REGION = process.env.AWS_REGION;

