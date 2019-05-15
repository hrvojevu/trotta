'use strict';

const joi = require('joi');
const { startOfTomorrow } = require('date-fns');

const schema = joi.object().keys({
  poolId: joi.string().required(),
  date: joi.date().less(startOfTomorrow()).required(),
  count: joi.number().integer().min(1).required(),
  data: joi.object().optional(),
});

function validate(data, currentSchema = schema) {
  const result = joi.validate(data, currentSchema);

  if (result.error) {
    throw result.error;
  }

  return result.value;
}

function validateRequest(req, res, next) {
  try {
    req.body = validate(req.body, schema);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateRequest,
};
