const config = require('config');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./dataStore');

module.exports = session({
  store: new SequelizeStore({
    db: sequelize
  }),
  ...config.get('app.session'),
});
