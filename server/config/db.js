const mongoose = require('mongoose');

const {
  DB_USER_NAME, DB_USER_PASSWORD, DB_NAME, CLUSTER_URL,
} = require('./env');

const URI = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${CLUSTER_URL}${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI).then(() => {
  console.log('Connected');
}).catch((err) => {
  console.log('err:::', err);
  throw err;
});
