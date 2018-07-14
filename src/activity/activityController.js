'use strict';

const activityService = require('./activityService');

async function list(req, res) {
  const activities = await activityService.list();

  res.json(activities);
}

async function get(req, res) {
  const activity = await activityService.get(req.params.id);

  res.json(activity);
}

async function create(req, res) {
  const activity = await activityService.create(req.body);

  res.json(activity);
}

async function patch(req, res) {
  const activity = await activityService.patch(req.params.id, req.body);

  res.json(activity);
}

async function remove(req, res) {
  await activityService.remove(req.params.id);

  res.sendStatus(204);
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
