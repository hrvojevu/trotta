'use strict';

const router = require('express-promise-router')();

const { list, get } = require('./userController');

router
  .get('/', list)
  .get('/:id', get);

module.exports = { router };
