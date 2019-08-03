#!/usr/bin/env node
import http from 'http';
import dotenv from 'dotenv';
import chalk from 'chalk';
import App from '../server';
import findConfig from 'find-config';

dotenv.config({ path: findConfig('.env') });

const config = require(`../config/${process.env.NODE_ENV}`);

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? `Pipe ${  port}`
    : `Port ${  port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind  } requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind  } is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  console.log(chalk.yellow('=========================================='));
  console.log(chalk.green(`Server listening on ${port}`));
  console.log(chalk.yellow('=========================================='));
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${  addr}`
    : `port ${  addr.port}`;
};

const port = normalizePort(config.port);
App.set('port', port);
const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
