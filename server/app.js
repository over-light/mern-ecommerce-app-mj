const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const authRoute = require('./modules/auth/auth.route');
const productRoute = require('./modules/product/product.route');
const categoryRoute = require('./modules/category/category.route');
const swaggerSpec = require('./swagger.json');

require('./config/db');
const { SERVER_PORT, IS_DEVELOPMENT } = require('./config/env');

const app = express();

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});
app.get('/', (_req, res) => {
  res.json({
    message: 'Server is running'
  });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);

// app.use(() => {
//     const error = new HttpError('Could not find this route', 404);
//     throw error;
// });

app.listen(SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at ${IS_DEVELOPMENT ? 'http://localhost:' : ''}${SERVER_PORT}`
  );
});
