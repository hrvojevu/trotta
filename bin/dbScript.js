'use strict';

/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop, global-require, import/no-dynamic-require */

const path = require('path');
const { Client } = require('pg');
const { isFunction } = require('lodash');

/**
 * Get an array of `{ query, values }` objects, each representing one table row insert query, in the case of array
 * data. When data is a function, it is returned as is.
 */
function getSeedQueries(tableName, data) {
  if (isFunction(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((d) => {
      const keys = Object.keys(d);
      const values = Object.values(d);
      const params = values.map((value, index) => `$${index + 1}`);
      const query = `INSERT INTO "${tableName}" (${keys.join(', ')}) VALUES (${params.join(', ')});`;

      return { query, values };
    });
  }

  throw new Error('Seed data must be an array of entities to insert or a function to execute.');
}

/**
 * Get a `{ query, values }` object representing one delete query on the table.
 */
function getDeleteFromQueries(tableName) {
  const query = `TRUNCATE TABLE "${tableName}" CONTINUE IDENTITY CASCADE;`;

  return { query, values: [] };
}

/**
 * Seed the database using the provided options.
 */
async function seed(dbUri, schema = '', seedsDir = './seeds', seedNames = []) {
  const time = process.hrtime();
  const client = new Client({ connectionString: dbUri });
  const seedsPath = path.resolve(process.cwd(), seedsDir);
  const seedTableNames = require(seedsPath);
  const seeds = seedTableNames
    .filter((name) => !seedNames.length || seedNames.includes(name))
    .map((name) => {
      const data = require(path.resolve(seedsPath, `${name}`));

      return { name, data };
    });

  if (!seeds.length) {
    console.log('Nothing to seed');

    return;
  }

  await client.connect();
  await client.query(`SET SCHEMA '${schema}'`);

  const deleteFromQueries = seeds.slice().reverse().map(({ name }) => getDeleteFromQueries(name));
  const seedQueries = seeds.map(({ name, data }) => getSeedQueries(name, data));

  console.log('Seeding started');

  for (const { query } of deleteFromQueries) {
    console.log('QUERY: ', query);
    await client.query(query);
  }


  for (const tableQueries of seedQueries) {
    if (Array.isArray(tableQueries)) {
      for (const { query, values } of tableQueries) {
        console.log('QUERY: ', query, 'VALUES: ', values);

        await client.query(query, values);
      }
    } else {
      await tableQueries();
    }
  }

  const [seconds, nanoseconds] = process.hrtime(time);

  console.log(`Seeding finished after ${seconds} seconds and ${nanoseconds} nanoseconds`);
}

module.exports = seed;
