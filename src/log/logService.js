'use strict';

const LogModel = require('./LogModel');

function list() {
  return LogModel.findAll();
}

function get(id) {
  return LogModel.findById(id);
}

function create(log) {
  return LogModel.create(log);
}

module.exports = {
  list,
  get,
  create,
};
