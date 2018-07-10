'use strict';

const poolTypeService = require('./poolTypeService');

async function list(req, res) {
  const types = await poolTypeService.list();

  res.json(types);
}

async function create(req, res) {
  const type = await poolTypeService.create(req.body);

  res.json(type);
}

async function patch(req, res) {
  const type = await poolTypeService.patch(req.params.id, req.body);

  res.json(type);
}

async function remove(req, res) {
  await poolTypeService.remove(req.params.id);

  res.sendStatus(204);
}

module.exports = {
  list,
  create,
  patch,
  remove,
};
