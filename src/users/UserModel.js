const Sequelize = require('sequelize');
const { omit } = require('lodash');

const { sequelize } = require('../dataStore');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM,
    defaultValue: 'US',
    values: ['SU', 'AD', 'US'],
  },
});

User.prototype.clean = () => {
  const user = this.toJSON();

  user.fullName = `${user.firstName} ${user.lastName}`;

  return omit(user, 'password');
};

module.exports = User;
