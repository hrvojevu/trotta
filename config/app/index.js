'use strict';

const { deferConfig: defer } = require('config/defer');

const cors = require('./cors');
const middleware = require('./middleware');
const session = require('./session');
const settings = require('./settings');

exports.default = {
  api: {
    endpoint: '/api',
  },
  cors: cors.default,
  middleware: middleware.default,
  session: session.default,
  settings: settings.default,
};

exports.development = {
  api: {
    uri: defer(({ app: { hostname, port, api: { endpoint } } }) => `http://${hostname}:${port}${endpoint}`),
  },
  hostname: '0.0.0.0',
  port: 3000,
  cors: cors.development,
  middleware: middleware.development,
  session: session.development,
  settings: settings.development,
};

exports.production = {
  api: {
    uri: defer(({ app: { url, api: { endpoint } } }) => `${url}${endpoint}`),
  },
  port: 3000,
  cors: cors.production,
  middleware: middleware.production,
  session: session.production,
  settings: settings.production,
};
