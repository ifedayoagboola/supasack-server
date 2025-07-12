import { createLogger, format, transports } from 'winston';
import appRootPath from 'app-root-path';
import variables from '@src/variables';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
    format.json()
  ),
  ...(!variables.app.isTesting && {
    transports: [
      new transports.File({
        filename: `${appRootPath}/logs/error.log`,
        level: 'error',
        silent: variables.app.isTesting
      }),
      new transports.File({
        filename: `${appRootPath}/logs/combined.log`,
        silent: variables.app.isTesting
      })
    ]
  })
});

if (variables.logs.showAppLogs) {
  logger.add(
    new transports.Console({
      format: format.combine(format.simple(), format.json())
    })
  );
}

export default logger;
