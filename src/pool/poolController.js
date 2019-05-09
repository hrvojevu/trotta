'use strict';

const poolService = require('./poolService');

async function list(req, res) {
  const includeGenerations = req.query.generations === 'true';
  const pools = await poolService.list(includeGenerations);

  res.json(pools);
}

async function get(req, res) {
  const includeGenerations = req.query.generations === 'true';
  const pool = await poolService.get(req.params.id, includeGenerations);

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

async function transfer({ body, query }, res) {
  const isInitialTransfer = query.initial === 'true';
  let pools;

  if (isInitialTransfer) {
    pools = await poolService.initialTransfer(body);
  } else {
    pools = await poolService.transfer(body);
  }

  res.json(pools);
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
  transfer,
};
