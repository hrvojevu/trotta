'use strict';

const util = require('util');

const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const { Nuxt, Builder } = require('nuxt');

const dataStore = require('./dataStore');
const nuxtConfig = require('../nuxt.config.js');
const session = require('./session');
const router = require('./web');

// The express application instance
const app = express();

// The hostname assigned to the Express application
const hostname = config.get('app.hostname');

// The port assigned to the Express application
const port = config.get('app.port');

async function setup() {
  // Set application settings
  Object.entries(config.get('app.settings')).forEach((entry) => app.set(...entry));

  // Use JSON body parser
  app.use(bodyParser.json(config.get('app.middleware.bodyParser.json')));
  app.use(bodyParser.urlencoded(config.get('app.middleware.bodyParser.urlencoded')));

  // Use sessions
  app.use(session);

  // Register router middleware
  router.register(app, config.get('app.settings'));

  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig);

  // Build only in dev mode
  if (process.env.NODE_ENV === 'development') {
    const builder = new Builder(nuxt);
    builder.build();
  }

  // Give Nuxt middleware to express
  app.use(nuxt.render);
}

async function start() {
  await setup();

  const listen = util.promisify(app.listen.bind(app));

  app.set('hostname', hostname);
  app.set('port', port);

  return listen(port, hostname);
}

(async function () { // eslint-disable-line func-names
  try {
    // Initialize data store
    await dataStore.sequelize.sync({ force: true });
    console.log('Data store initiazlied.');

    // Start application
    await start();
    console.info(`Server listening at ${hostname}:${port}`);
  } catch (err) {
    console.error({ err }, 'Failed to start');
    process.exit();
  }
}());
