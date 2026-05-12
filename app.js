const path = require('node:path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const createMoviesRouter = require('./routes/movies');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const openApiPath = path.join(__dirname, 'openapi.yaml');
const swaggerDocument = YAML.load(openApiPath);

const createApp = ({ pool } = {}) => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Movies API',
      endpoints: {
        movies: '/api/movies',
        docs: '/api-docs',
        openapi: '/openapi.yaml'
      }
    });
  });

  app.get('/openapi.yaml', (req, res) => {
    res.sendFile(openApiPath);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/movies', createMoviesRouter(pool));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

const app = createApp();

module.exports = app;
module.exports.createApp = createApp;
