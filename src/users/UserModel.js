const Sequelize = require('sequelize');

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

module.exports = User;
