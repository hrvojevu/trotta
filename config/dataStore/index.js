'use strict';

const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../../');

exports.default = {
  model: {
    directories: [path.join(PROJECT_ROOT, 'src')],
    pattern: /^.+(\w+Model.js)$/,
    transformations: {
      underscored: true, // Convert to snake case every field and model name
      sanitize: true, // Remove a model suffix
    },
  },
  options: {
    define: {
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
      version: true,
    },
    logging: false, // By default SQL statements are logged
    operatorsAliases: false, // Disable string aliases to avoid deprecation warning
  },
};

exports.development = {
  options: {
    logging: false,
    schema: 'black-db',
  },
  uri: 'postgres://0.0.0.0:5432/black-db',
};
