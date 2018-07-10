'use strict';

const poolService = require('./poolService');

async function list(req, res) {
  const pools = await poolService.list();

  res.json(pools);
}

async function get(req, res) {
  const pool = await poolService.get(req.params.id);

  res.json(pool);
}

async function create(req, res) {
  const pool = await poolService.create(req.body);

  res.json(pool);
}

async function patch(req, res) {
  const pool = await poolService.patch(req.params.id, req.body);

  res.json(pool);
}

async function remove(req, res) {
  await poolService.remove(req.params.id);

  res.sendStatus(204);
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
