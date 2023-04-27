const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./modules/auth/auth.route');
require('./config/db');
const { SERVER_PORT, IS_DEVELOPMENT } = require('./config/env');

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Server is running',
  });
});

app.use('/api/v1', authRoute);

app.listen(SERVER_PORT, () => {
  console.log(`⚡️[server]: Server is running at ${IS_DEVELOPMENT ? 'http://localhost:' : ''}${SERVER_PORT}`);
});
