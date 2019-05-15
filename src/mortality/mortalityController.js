'use strict';

const mortalityService = require('./mortalityService');

async function listByPool({ params }, res) {
  const mortalities = await mortalityService.list({ poolId: params.id });

  res.json(mortalities);
}

async function list(req, res) {
  const mortalities = await mortalityService.list();

  res.json(mortalities);
}

async function get({ params }, res) {
  const mortality = await mortalityService.get(params.id);

  res.json(mortality);
}

async function create({ body }, res) {
  const mortality = await mortalityService.create(body);

  res.json(mortality);
}

module.exports = {
  listByPool,
  list,
  get,
  create,
};
