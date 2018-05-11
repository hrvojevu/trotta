'use strict';

const router = require('express-promise-router')();

const { login, logout } = require('./authController');

router
  .post('/', login)
  .delete('/', logout);

module.exports = { router };
