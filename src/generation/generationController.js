'use strict';

const generationService = require('./generationService');

async function list(req, res) {
  const generations = await generationService.list();

  res.json(generations);
}

async function get(req, res) {
  const generation = await generationService.get(req.params.id);

  res.json(generation);
}

async function create(req, res) {
  const generation = await generationService.create(req.body);

  res.json(generation);
}

async function patch(req, res) {
  const generation = await generationService.patch(req.params.id, req.body);

  res.json(generation);
}

async function remove(req, res) {
  await generationService.remove(req.params.id);

  res.sendStatus(204);
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
