'use strict';

const { DataTypes, Model } = require('sequelize');

class GenerationPoolModel extends Model {
  static fields() {
    return {
      // Define timestamp fields explicitly to preserve camelCase in code
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    };
  }

  static options() {
    return {
      paranoid: false,
    };
  }
}

module.exports = GenerationPoolModel;
