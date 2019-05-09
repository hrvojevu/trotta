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

async function initialTransfer({ toPoolId, generationId }) {
  await GenerationPoolModel.create({ generationId, poolId: toPoolId });

  return list(true);
}

async function transfer({ toPoolId, fromPoolId, transferCount }) {
  const include = [{ model: GenerationModel, as: 'generations' }];
  const fromPool = await PoolModel.findById(fromPoolId, { include });

  if (!fromPool) {
    throw new Error('From pool not found.');
  }

  const toPool = await PoolModel.findById(toPoolId, { include });

  if (!toPool) {
    throw new Error('To pool not found.');
  }

  const toPoolGenerationIds = toPool.generations.map((g) => g.id);
  const { generations } = fromPool;
  let { count, countKg } = fromPool;

  return dataStore.sequelize.transaction(async () => {
    if (count === transferCount) {
      // Destroy generation-pool relations associated with `fromPool`
      await GenerationPoolModel.destroy({ where: { poolId: fromPoolId } });
      await PoolModel.update({ count: 0, countKg: 0 }, { where: { id: fromPoolId } });
    } else {
      const transferedPercentage = transferCount / count;

      count = transferCount;
      countKg *= transferedPercentage;

      await PoolModel.decrement({ count, countKg }, { where: { id: fromPoolId } });
    }

    await GenerationPoolModel.bulkCreate(generations.reduce((acc, { id: generationId }) => {
      // Create new generation-pool relation only if a generation is not in the `toPool` already
      if (!toPoolGenerationIds.includes(generationId)) {
        acc.push({ generationId, poolId: toPoolId });
      }

      return acc;
    }, []));
    await PoolModel.increment({ count, countKg }, { where: { id: toPoolId } });

    return list(true);
  });
}

module.exports = {
  list,
  get,
  create,
  patch,
  remove,
  initialTransfer,
  transfer,
};
