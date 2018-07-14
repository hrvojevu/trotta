'use strict';

const logService = require('./logService');

async function list(req, res) {
  const logs = await logService.list();

  res.json(logs);
}

async function get(req, res) {
  const log = await logService.get(req.params.id);

  res.json(log);
}

async function create(req, res) {
  const log = await logService.create(req.body);

  res.json(log);
}

module.exports = {
  list,
  get,
  create,
};
