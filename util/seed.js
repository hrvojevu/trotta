'use strict';

const bcrypt = require('bcryptjs');

const UserModel = require('../src/users/UserModel');

function generatePwd(plaintext) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintext, salt);
}

function addSuperUser() {
  UserModel.create({
    firstName: 'Super',
    lastName: 'User',
    username: 'superuser',
    password: generatePwd('superuser'),
    role: 'SU',
  });
}

module.exports = {
  addSuperUser,
};
