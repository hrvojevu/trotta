'use strict';

const generationService = require('./generationService');

async function list(req, res) {
  const includePools = req.query.pools === 'true';
  const pools = await generationService.list(includePools);

  res.json(pools);
}

async function get(req, res) {
  const includePools = req.query.pools === 'true';
  const pool = await generationService.get(req.params.id, includePools);

  res.json(pool);
}

async function create(req, res) {
  const pool = await generationService.create(req.body);

  res.json(pool);
}

async function patch(req, res) {
  const pool = await generationService.patch(req.params.id, req.body);

  res.json(pool);
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
