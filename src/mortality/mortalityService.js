'use strict';

const MortalityModel = require('./MortalityModel');
const PoolModel = require('../pool/PoolModel');
const poolService = require('../pool/poolService');

function list({ poolId }) {
  const where = {};

  if (poolId) {
    where.poolId = poolId;
  }

  return MortalityModel.findAll({
    where,
    include: [{ model: PoolModel, as: 'pool' }],
  });
}

function get(id) {
  return MortalityModel.findById(id, {
    include: [{ model: PoolModel, as: 'pool' }],
  });
}

async function create(mortality) {
  const { count, poolId } = mortality;
  const pool = await poolService.get(poolId);

  if (!pool) {
    throw new Error('Pool not found.');
  }

  if (count > pool.count) {
    throw new Error('Mortality can not be greater than pool count.');
  }

  const transferedPercentage = count / pool.count;
  const countKg = pool.countKg * transferedPercentage;

  await pool.decrement({ count, countKg }, { where: { id: poolId } });

  return MortalityModel.create(mortality);
}

module.exports = {
  list,
  get,
  create,
};
