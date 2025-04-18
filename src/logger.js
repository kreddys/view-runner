import winston from 'winston';
import path from 'path';
import config from './config.js';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.resolve(config.logsFolder || './logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create a logger instance
const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: path.join(logsDir, 'application.log'),
        }),
    ],
});

export default logger;