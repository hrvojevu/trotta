'use strict';

const express = require('express');

const { router: authRouter } = require('../auth');
const { router: userRouter } = require('../users');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = { router };
