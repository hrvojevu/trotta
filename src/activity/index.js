'use strict';

const router = require('express-promise-router')();

const activityController = require('./activityController');

router
  .get('/', activityController.list)
  .get('/:id', activityController.get)
  .post('/', activityController.create)
  .patch('/:id', activityController.patch)
  .delete('/:id', activityController.remove);

module.exports = { router };
