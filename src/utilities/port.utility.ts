import { DEFAULT_PORT } from '@src/constants';

export const normalizePort = (val: string): number => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port) || port < 0) {
    return DEFAULT_PORT;
  }

  return port;
};
