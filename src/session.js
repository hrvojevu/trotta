const config = require('config');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./dataStore');

const store = new SequelizeStore({ db: sequelize });

module.exports = {
  session: session({
    store,
    ...config.get('app.session'),
  }),
  store,
};
