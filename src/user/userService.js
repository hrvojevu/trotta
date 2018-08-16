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

async function patch(id, user) {
  const [, [updated]] = await UserModel.update(user, {
    returning: true,
    where: { id },
  });

  return updated;
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
