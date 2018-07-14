'use strict';

const { DataTypes, Model } = require('sequelize');

class ActivityModel extends Model {
  static fields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
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
  static associate({ Log }) {
    this.hasMany(Log, {
      as: 'logs',
      foreignKey: { name: 'activityId', field: 'activity_id', allowNull: false },
    });
  }
}

module.exports = ActivityModel;
