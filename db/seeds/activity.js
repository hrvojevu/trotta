'use strict';

/* eslint-disable no-plusplus */

const { v4: uuidv4 } = require('uuid');

const activities = [
  {
    id: uuidv4(),
    name: 'Transfer',
    updated_at: '2018-01-08',
    created_at: '2018-01-08',
  },
  {
    id: uuidv4(),
    name: 'Mortalitet',
    updated_at: '2018-01-08',
    created_at: '2018-01-08',
  },
  {
    id: uuidv4(),
    name: 'Hranjenje',
    updated_at: '2018-01-08',
    created_at: '2018-01-08',
  },
];

module.exports = activities;
