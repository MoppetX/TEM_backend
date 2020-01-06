const Chalk = require('chalk');
const server = require('./server');
const connectDB = require('./config/db');

connectDB();

// Start up the server on a customer port, if required.
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

// console.log(process.env.ENV1);
// console.log(process.env.ENV2);
// console.log(process.env.ENV3);

server.listen(PORT, () => {
  console.info(
    `server has started on port ${
      PORT === DEFAULT_PORT ? PORT : Chalk.bgYellowBright(PORT)
    }`,
  );
});
