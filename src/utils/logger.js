const pino = require('pino');
const dotenv = require('dotenv');

dotenv.config();

const logger = pino({
  transport: {
    target: 'pino-pretty', // Для красивого вывода
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      ignore: 'pid,hostname'
    }
  },
  level: process.env.LOG_LEVEL // Log types: debug, warn, error
});

module.exports = logger;
