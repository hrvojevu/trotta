'use strict';

const { DataTypes, Model } = require('sequelize');

class GenerationModel extends Model {
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
      spawnDate: {
        type: DataTypes.DATE,
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
  static associate({ Pool, GenerationPool }) {
    this.belongsToMany(Pool, {
      as: 'pools',
      through: { model: GenerationPool, unique: false },
      foreignKey: { name: 'generationId', field: 'generation_id' },
    });
  }
}

module.exports = GenerationModel;
