'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.get('dataStore.uri'), config.get('dataStore.options'));

module.exports = {
  sequelize
};
