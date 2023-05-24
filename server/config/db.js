const mongoose = require('mongoose');

const { DB_USER_NAME, DB_USER_PASSWORD, DB_NAME, CLUSTER_URL, IS_DEVELOPMENT } = require('./env');

const URI = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${CLUSTER_URL}${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(IS_DEVELOPMENT ? `mongodb://localhost:27017/${DB_NAME}` : URI)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('err:::', err);
    throw err;
  });
