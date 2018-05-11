'use strict';

const app = require('./app');
const dataStore = require('./dataStore');

module.exports = {
  app: app.development,
  dataStore: dataStore.development,
};
