'use strict';

const router = require('express-promise-router')();

const userController = require('./userController');

router
  .get('/', userController.list)
  .get('/:id', userController.get)
  .post('/:id', userController.create)
  .patch('/:id', userController.patch)
  .delete('/:id', userController.remove);

module.exports = { router };
