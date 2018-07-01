'use strict';

const UserModel = require('./UserModel');

function list() {
  return UserModel.findAll();
}

function get(id) {
  return UserModel.findById(id);
}

function create(user) {
  return UserModel.create(user);
}

function patch(id, user) {
  return UserModel.update(user, {
    returning: true,
    where: { id },
  });
}

function remove(id) {
  return UserModel.destroy({ where: { id } });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
};
