'use strict';

const { DataTypes, Model } = require('sequelize');

class PoolTypeModel extends Model {
  static fields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
        validate: { notEmpty: true },
      },
      // Define timestamp fields explicitly to preserve camelCase in code
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    };
  }
  static associate({ Pool }) {
    this.hasMany(Pool, {
      as: 'pools',
      foreignKey: { name: 'poolTypeId', field: 'pool_type_id', allowNull: false },
    });
  }
}

module.exports = PoolTypeModel;
