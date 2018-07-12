'use strict';

const router = require('express-promise-router')();

const generationController = require('./generationController');

router
  .get('/', generationController.list)
  .get('/:id', generationController.get)
  .post('/:id', generationController.create)
  .patch('/:id', generationController.patch)
  .delete('/:id', generationController.remove);


module.exports = { router };
