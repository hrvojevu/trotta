'use strict';

const PoolTypeModel = require('./PoolTypeModel');

function list() {
  return PoolTypeModel.findAll();
}

function create(pool) {
  return PoolTypeModel.create(pool);
}

function patch(id, pool) {
  return PoolTypeModel.update(pool, {
    returning: true,
    where: { id },
  });
}

function remove(id) {
  return PoolTypeModel.destroy({ where: { id } });
}

module.exports = {
  list,
  create,
  patch,
  remove,
};
