'use strict';

exports.default = {
  options: {
    define: {
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
      version: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
    },
    logging: false, // By default SQL statements are logged
    operatorsAliases: false, // Disable string aliases to avoid deprecation warning
  },
};

exports.development = {
  options: {
    logging: true,
  },
  uri: 'mysql://root:admin@127.0.0.1/black-db',
};
