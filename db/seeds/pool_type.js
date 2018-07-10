'use strict';

const { v4: uuidv4 } = require('uuid');

const poolTypes = [
  {
    id: uuidv4(),
    name: 'Bazen veliki',
    code: 'BV',
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  }, {
    id: uuidv4(),
    name: 'Kanal',
    code: 'K',
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  }, {
    id: uuidv4(),
    name: 'Predbazen veliki',
    code: 'PBV',
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  }, {
    id: uuidv4(),
    name: 'Predbazen mali',
    code: 'PBM',
    updated_at: '2018-07-01',
    created_at: '2018-07-01',
  },
];

module.exports = poolTypes;
