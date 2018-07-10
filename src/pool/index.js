'use strict';

const router = require('express-promise-router')();

const poolController = require('./poolController');
const poolTypeController = require('./poolTypeController');

router
  .get('/types', poolTypeController.list)
  .post('/types/:id', poolTypeController.create)
  .patch('/types/:id', poolTypeController.patch)
  .delete('/types/:id', poolTypeController.remove)
  .get('/', poolController.list)
  .get('/:id', poolController.get)
  .post('/:id', poolController.create)
  .patch('/:id', poolController.patch)
  .delete('/:id', poolController.remove);


module.exports = { router };
