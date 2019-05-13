'use strict';

const router = require('express-promise-router')();

const logController = require('./logController');

router
  .get('/', logController.list)
  .get('/:id', logController.get)
  .post('/', logController.create);

module.exports = { router };
