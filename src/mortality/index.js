'use strict';

const router = require('express-promise-router')();

const mortalityController = require('./mortalityController');
const { validateRequest } = require('./validateMortality');

router
  .get('/pool/:id', mortalityController.listByPool)
  .get('/', mortalityController.list)
  .get('/:id', mortalityController.get)
  .post('/', validateRequest, mortalityController.create);

module.exports = { router };
