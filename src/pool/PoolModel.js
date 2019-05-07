'use strict';

const { DataTypes, Model } = require('sequelize');

class PoolModel extends Model {
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
      length: {
        type: DataTypes.FLOAT,
      },
      width: {
        type: DataTypes.FLOAT,
      },
      depth: {
        type: DataTypes.FLOAT,
      },
      volume: {
        type: DataTypes.FLOAT,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      countKg: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
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
  static associate({ PoolType, Generation, GenerationPool, Log }) {
    this.belongsTo(PoolType, {
      as: 'type',
      foreignKey: { name: 'poolTypeId', field: 'pool_type_id', allowNull: false },
    });
    this.belongsToMany(Generation, {
      as: 'generations',
      through: { model: GenerationPool, unique: false },
      foreignKey: { name: 'poolId', field: 'pool_id' },
    });
    this.hasMany(Log, {
      as: 'sourceLogs',
      foreignKey: { name: 'sourcePoolId', field: 'source_pool_id', allowNull: false },
    });
    this.hasMany(Log, {
      as: 'destinationLogs',
      foreignKey: { name: 'destinationPoolId', field: 'destination_pool_id', allowNull: true },
    });
  }
}

module.exports = PoolModel;
