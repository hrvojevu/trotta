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

function patch(id, activity) {
  return ActivityModel.update(activity, {
    returning: true,
    where: { id },
  });
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
