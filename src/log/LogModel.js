'use strict';

const { DataTypes, Model } = require('sequelize');

class LogModel extends Model {
  static fields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
  static associate({ Activity, Pool, User }) {
    this.belongsTo(Activity, {
      as: 'activity',
      foreignKey: { name: 'activityId', field: 'activity_id', allowNull: false },
    });
    this.belongsTo(Pool, {
      as: 'source',
      foreignKey: { name: 'sourcePoolId', field: 'source_pool_id', allowNull: false },
    });
    this.belongsTo(Pool, {
      as: 'destination',
      foreignKey: { name: 'destinationPoolId', field: 'destination_pool_id', allowNull: true },
    });
    this.belongsTo(User, {
      as: 'user',
      foreignKey: { name: 'userId', field: 'user_id', allowNull: false },
    });
  }
}

module.exports = LogModel;
