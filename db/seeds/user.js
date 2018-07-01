'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

function generatePwd(plaintext) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintext, salt);
}

const users = [
  {
    id: uuidv4(),
    first_name: 'Super',
    last_name: 'User',
    username: 'superuser',
    email: 'superuser@mail.com',
    password: generatePwd('superuser'),
    role: 'SU',
    updated_at: '2018-01-08',
    created_at: '2018-01-08',
  },
];

module.exports = users;
