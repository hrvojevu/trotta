'use strict';

const readDir = require('recursive-readdir');
const Sequelize = require('sequelize');
const { flatten, has, invoke, snakeCase } = require('lodash');

const MODEL_CAMEL_CASE_PATTERN = /^([a-zA-z]+)Model$/;
const MODEL_SNAKE_CASE__PATTERN = /^([a-z_]+)_model$/;

/**
 * Check if a provided object is a class which extends the `Sequelize.Model`.
 * This method traverses the prototype chain.
 */
function isModel(object) {
  const prototype = Object.getPrototypeOf(object);

  if (!prototype) {
    return false;
  } else if (prototype === Sequelize.Model) {
    return true;
  }

  return isModel(prototype);
}

/**
 * Load sequelize models from provided directories using a provided pattern. When a pattern is matched file is required
 * and inspected, only files that pass inspection will be return. To pass inspection file must export a class that
 * extends the `Sequelize.Model`, or an object with a method named 'models' which will return an array of classes that
 * extend the `Sequelize.Model`.
 */
async function loadModels(directories, pattern) {
  const models = [];
  const reads = [];

  directories.forEach((directory) => reads.push(readDir(directory)));

  const files = await Promise.all(reads);

  flatten(files).forEach((file) => {
    if (!pattern.test(file)) {
      return;
    }

    const object = require(file); // eslint-disable-line global-require, import/no-dynamic-require

    if (isModel(object)) {
      models.push(object);
    } else if (has(object, 'models')) {
      const result = invoke(object, 'models') || [];

      if (!Array.isArray(result)) {
        return;
      }

      models.push(...result.filter((el) => isModel(el)));
    }
  });

  return models;
}

/**
 * Strip a model suffix from the provided model name. When a model name doesn't end with wanted suffix it's returned
 * as is. Works both with `camelCase` and `snake_case`, also it's case sensitive.
 */
function stripModelSuffix(modelName) {
  let match = MODEL_CAMEL_CASE_PATTERN.exec(modelName);

  if (match) {
    return match[1];
  }

  match = MODEL_SNAKE_CASE__PATTERN.exec(modelName);

  return match ? match[1] : modelName;
}

/**
 * Convert model fields and corresponding table name to snake case. Fields and table name will be converted only if
 * `field` and `tableName` keys are not defined.
 */
function convertToSnakeCase(fields, options) {
  Object.entries(fields).forEach(([key, value]) => {
    if (value.field === value.fieldName) { // Equality is treated as absence
      value.field = snakeCase(key);
    }
  });

  if (!has(options, 'tableName') || options.tableName === options.modelName) { // Equality is treated as absence
    options.tableName = snakeCase(options.modelName);
  }
}

/**
 * Register global hooks based on provided transformations.
 */
function registerHooks(sequelize, { underscored, sanitize }) {
  if (underscored) {
    sequelize.addHook('beforeDefine', convertToSnakeCase);
  }

  if (sanitize) {
    sequelize.addHook('beforeDefine', (fields, options) => {
      options.tableName = stripModelSuffix(options.tableName);
    });
  }
}

/**
 * Initialize Sequelize models by requiring them and calling `init` method on each. Based on provided options the
 * `beforeDefine` hook may added in order to manipulate model fields and corresponding table name.
 */
async function initModels(sequelize, { directories, pattern, transformations }) {
  let models = await loadModels(directories, pattern);

  registerHooks(sequelize, transformations);

  models = models.reduce((acc, model) => {
    const fields = invoke(model, 'fields') || {};
    const options = invoke(model, 'options') || {};
    const modelName = stripModelSuffix(options.modelName || model.name);

    acc[modelName] = model.init(fields, { sequelize, ...options });

    return acc;
  }, {}); // Prefer object for easier destructing

  Object.values(models).forEach((model) => {
    invoke(model, 'associate', models);
    invoke(model, 'addHooks', models);
  });
}

/**
 * Create the Sequelize instance using provided config and initialize models.
 */
async function init({ uri, options, model }) {
  module.exports.sequelize = new Sequelize(uri, options);

  await this.sequelize.authenticate();
  await initModels(this.sequelize, model);
  await this.sequelize.sync();
}

module.exports = {
  init,
};
