'use strict';

const ActivityModel = require('./ActivityModel');

function list() {
  return ActivityModel.findAll();
}

function get(id) {
  return ActivityModel.findById(id);
}

function create(activity) {
  return ActivityModel.create(activity);
}

async function patch(id, activity) {
  const [, [updated]] = await ActivityModel.update(activity, {
    returning: true,
    where: { id },
  });

  return updated;
}

function remove(id) {
  return ActivityModel.destroy({ where: { id } });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
