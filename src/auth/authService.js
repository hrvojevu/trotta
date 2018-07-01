'use strict';

const bcrypt = require('bcryptjs');
const { omit } = require('lodash');

const UserModel = require('../user/UserModel');

async function authenticate(username, password) {
  const user = await UserModel.find({ where: { username } });

  if (!user) {
    throw new Error();
  }

  const authenticated = bcrypt.compareSync(password, user.password);

  if (!authenticated) {
    throw new Error();
  }

  return omit(user.toJSON(), 'password');
}

module.exports = {
  authenticate,
};
