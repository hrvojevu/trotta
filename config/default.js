'use strict';

const app = require('./app');
const dataStore = require('./dataStore');

module.exports = {
  app: app.default,
  dataStore: dataStore.default,
};
