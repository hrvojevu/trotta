'use strict';

const dataStore = require('../dataStore');
const GenerationModel = require('../generation/GenerationModel');
const GenerationPoolModel = require('../generation/GenerationPoolModel');
const PoolModel = require('./PoolModel');
const PoolTypeModel = require('./PoolTypeModel');

function list(generations = false) {
  const include = [{ model: PoolTypeModel, as: 'type' }];

  if (generations) {
    include.push({ model: GenerationModel, as: 'generations' });
  }

  return PoolModel.findAll({ include, order: [['updatedAt', 'ASC']] });
}

function get(id, generations = false) {
  const include = [{ model: PoolTypeModel, as: 'type' }];

  if (generations) {
    include.push({ model: GenerationModel, as: 'generations' });
  }

  return PoolModel.findById(id, { include });
}

function create(pool) {
  return PoolModel.create(pool);
}

async function patch(id, pool) {
  await PoolModel.update(pool, { where: { id } });

  // Additional query is made since we can not include associations when returning updated field
  const updated = await get(id, true);

  return updated;
}

function remove(id) {
  return PoolModel.destroy({ where: { id } });
}

async function transfer({ toPoolId, fromPoolId, generations = [] }) {
  return dataStore.sequelize.transaction(async () => {
    if (generations.length) {
      await GenerationPoolModel.bulkCreate(generations.reduce((acc, g) => {
        acc.push({ generationId: g, poolId: toPoolId });

        return acc;
      }, []));

      return list(true);
    }

    const fromPoolGenerations = await GenerationPoolModel.findAll({
      where: { poolId: fromPoolId },
      raw: true,
    });

    await GenerationPoolModel.destroy({ where: { poolId: fromPoolId } });
    await GenerationPoolModel.bulkCreate(fromPoolGenerations.reduce((acc, { generationId }) => {
      acc.push({ generationId, poolId: toPoolId });

      return acc;
    }, []));

    return list(true);
  });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
  transfer,
};
