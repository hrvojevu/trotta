'use strict';

const PoolModel = require('./PoolModel');
const PoolTypeModel = require('./PoolTypeModel');

function list() {
  return PoolModel.findAll({
    include: [{ model: PoolTypeModel, as: 'type' }],
  });
}

function get(id) {
  return PoolModel.findById(id);
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
