'use strict';

const express = require('express');

const { router: authRouter } = require('../auth');
const { router: poolRouter } = require('../pool');
const { router: userRouter } = require('../user');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/pools', poolRouter);
router.use('/users', userRouter);

module.exports = { router };
