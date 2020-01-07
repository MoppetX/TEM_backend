/* eslint-disable */
const mongoose = require('mongoose');
const Chalk = require('chalk');
const loadDummyData = require('./utils/load');

let dbUrl;
dbUrl = process.env.MONGODB_CONNECTION_STRING;

if (!dbUrl) {
  console.error(
    Chalk.bgRedBright.bold(
      `Error: Please supply an Env. Var. for ${Chalk.inverse(
        'MONGODB_CONNECTION_STRING',
      )}'`,
    ),
  );
  // Exit process with failure
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected to ${dbUrl}`);

    if (process.env.LOAD_SEED_DATA) {
      await loadDummyData();
      console.log('Seed, data loaded');
    }
  } catch (err) {
    // console.error(err);
    console.error(err.message);
    console.error(`MONGODB_CONNECTION_STRING set to >${dbUrl}<`);
    // Exit process with failure
    process.exit(1);
  }
  console.log('Backend startup complete');
};

module.exports = connectDB;
