'use strict';

const GenerationModel = require('../generation/GenerationModel');
const PoolModel = require('./PoolModel');
const PoolTypeModel = require('./PoolTypeModel');

function list(generations = false) {
  const include = [{ model: PoolTypeModel, as: 'type' }];

  if (generations) {
    include.push({ model: GenerationModel, as: 'generations' });
  }

  return PoolModel.findAll({ include });
}

function get(id, generations = false) {
  const include = [{ model: PoolTypeModel, as: 'type' }];

  if (generations) {
    include.push({ model: GenerationModel, as: 'generations' });
  }

  return PoolModel.findById(id, { include });
}

function create(pool) {
  return PoolModel.create(pool);
}

function patch(id, pool) {
  return PoolModel.update(pool, {
    returning: true,
    where: { id },
  });
}

function remove(id) {
  return PoolModel.destroy({ where: { id } });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
