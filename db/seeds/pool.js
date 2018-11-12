'use strict';

/* eslint-disable no-plusplus */

const { v4: uuidv4 } = require('uuid');

const types = require('./pool_type');

const pools = [];

for (let i = 0; i < 20; i++) {
  pools.push({
    id: uuidv4(),
    name: `Bazen veliki ${i + 1}`,
    pool_type_id: types.find((t) => t.code === 'BV').id,
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  });
}

for (let i = 0; i < 21; i++) {
  pools.push({
    id: uuidv4(),
    name: `Predbazen mali ${i + 1}`,
    pool_type_id: types.find((t) => t.code === 'PBM').id,
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  });
}

for (let i = 0; i < 8; i++) {
  pools.push({
    id: uuidv4(),
    name: `Predbazen veliki ${i + 1}`,
    pool_type_id: types.find((t) => t.code === 'PBV').id,
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  });
}

for (let i = 0; i < 3; i++) {
  pools.push({
    id: uuidv4(),
    name: `Kanal ${i + 1}`,
    pool_type_id: types.find((t) => t.code === 'K').id,
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  });
}

module.exports = pools;
