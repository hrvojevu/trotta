'use strict';

const express = require('express');

const { router: userRouter } = require('../users');

const router = express.Router();

router.use('/users', userRouter);

module.exports = { router };
