/* eslint-disable */
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

// Init Middleware
server.use(express.json());

server.get('/', (req, res) => {
  res.render('index');
});

// will render the index.html file if nothing else is specified
server.use(express.static(__dirname + 'public'));

// Registering the custom routes
server.use('/user', require('./src/routes/user'));
server.use('/recipe', require('./src/routes/recipe'));

// Handler for any error
// server.use((req, res, next) => {
//   switch (req.url) {
//     case '/bibble':
//       res.status(HttpStatus.IM_A_TEAPOT).send(HttpStatus.getStatusText(418));
//       break;
//
//     default:
//       res
//         .status(HttpStatus.NOT_FOUND)
//         .render(HttpStatus.getStatusCode('Not Found') + '');
//   }
// next();
// });

module.exports = server;
