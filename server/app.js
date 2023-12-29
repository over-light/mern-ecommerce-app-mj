const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');

require('./config/db');

const allRoutes =require('./routes');

const { SERVER_PORT, IS_DEVELOPMENT } = require('./config/env');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  next();
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Server is running'
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'
  })
);

app.use(allRoutes);


app.listen(SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at ${IS_DEVELOPMENT ? 'http://localhost:' : ''}${SERVER_PORT}`
  );
});
