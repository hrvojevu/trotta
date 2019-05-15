'use strict';

const { DataTypes, Model } = require('sequelize');

class MortalityModel extends Model {
  static fields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSONB,
        defaultValue: {},
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
    this.belongsTo(Pool, {
      as: 'pool',
      foreignKey: { name: 'poolId', field: 'pool_id', allowNull: false },
    });
  }
}

module.exports = MortalityModel;
