'use strict';

const userService = require('./userService');

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' },
];

function list(req, res) {
  res.json(users);
}

function get(req, res) {
  const id = 1;
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
}

async function create(req, res) {
  const user = await userService.create(req.body);

  res.json(user);
}

async function patch(req, res) {
  const user = await userService.patch(req.params.id, req.body);

  res.json(user);
}

async function remove(req, res) {
  await userService.remove(req.params.id);

  res.sendStatus(204);
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
