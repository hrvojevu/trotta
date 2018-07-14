'use strict';

const express = require('express');

const { router: activityRouter } = require('../activity');
const { router: authRouter } = require('../auth');
const { router: generationRouter } = require('../generation');
const { router: logRouter } = require('../log');
const { router: poolRouter } = require('../pool');
const { router: userRouter } = require('../user');

const router = express.Router();

router.use('/activities', activityRouter);
router.use('/auth', authRouter);
router.use('/generations', generationRouter);
router.use('/logs', logRouter);
router.use('/pools', poolRouter);
router.use('/users', userRouter);

module.exports = { router };
