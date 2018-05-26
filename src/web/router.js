'use strict';

const express = require('express');

const { router: apiRouter } = require('./apiRouter');

function register(app, { basePath, apiPath }) {
  const router = express.Router();

  router.use(apiPath, apiRouter);

  app.use(basePath, router);
}

module.exports = { register };
