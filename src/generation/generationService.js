'use strict';

const GenerationModel = require('./GenerationModel');
const PoolModel = require('../pool/PoolModel');

function list(pools = false) {
  return GenerationModel.findAll({
    include: pools ? [{ model: PoolModel, as: 'pools' }] : [],
  });
}

function get(id, pools = false) {
  return GenerationModel.findById(id, {
    include: pools ? [{ model: PoolModel, as: 'pools' }] : [],
  });
}

function create(generation) {
  return GenerationModel.create(generation);
}

function patch(id, generation) {
  return GenerationModel.update(generation, {
    returning: true,
    where: { id },
  });
}

function remove(id) {
  return GenerationModel.destroy({ where: { id } });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
