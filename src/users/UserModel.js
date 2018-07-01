'use strict';

const { DataTypes, Model } = require('sequelize');

class UserModel extends Model {
  static fields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      firstName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true },
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM,
        defaultValue: 'US',
        values: ['SU', 'AD', 'US'],
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
}

module.exports = UserModel;
