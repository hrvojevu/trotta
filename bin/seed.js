'use strict';

const program = require('commander');
const config = require('config');
const dbScript = require('./dbScript');

/**
 * Defines the usage of the script. `-f` flag forces the script to run in all environments,
 * while all the extra arguments are taken as a list of seed names which to run.
 * Example usages (running through npm):
 *  - npm run db:seed (seed all of the data; won't work in production)
 *  - npm run db:seed -- -f (seed all of the data; will work in production)
 *  - npm run db:seed module module_run
 *  (seed the `module` and `module_run` data; won't work in production)
 *  - npm run db:seed role -- -f (seed the `role` data; will work in production)
 */
program
  .option('-f, --force', 'Run the script in all environments, including production')
  .parse(process.argv);

/**
 * Run the seed script.
 */
async function run() {
  if (config.util.getEnv('NODE_ENV') === 'production' && !program.force) {
    console.info('Seeding disallowed in production');

    return;
  }

  const { uri, options } = config.get('dataStore');

  try {
    await dbScript(uri, options.schema, './db/seeds', program.args);
    process.exit(0);
  } catch (err) {
    console.error({ err }, 'Failed to seed the database');
    process.exit(1);
  }
}

run();
