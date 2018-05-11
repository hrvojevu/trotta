'use strict';

const { deferConfig: defer } = require('config/defer');

const middleware = require('./middleware');
const session = require('./session');
const settings = require('./settings');

exports.default = {
  middleware: middleware.default,
  session: session.default,
  settings: settings.default,
};

exports.development = {
  api: {
    endpoint: '/api',
    uri: defer(({ app: { hostname, port, api: { endpoint } } }) => `http://${hostname}:${port}${endpoint}`),
  },
  hostname: '0.0.0.0',
  port: 3000,
  middleware: middleware.development,
  session: session.development,
  settings: settings.development,
};
