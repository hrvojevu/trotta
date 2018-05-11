'use strict';

const express = require('express');

const { router: apiRouter } = require('./apiRouter');
const { router: authRouter } = require('../auth');

function register (app, { basePath, apiPath }) {
  const router = express.Router();

  router.use('/auth', authRouter);
  router.use(apiPath, apiRouter);

  app.use(basePath, router);
}

module.exports = { register };
