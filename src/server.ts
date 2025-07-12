import 'reflect-metadata';
import app from './app';
import { normalizePort } from './utilities/port.utility';
import variables from './variables';
import { createServerInstance } from './utilities/server.utility';

const port = normalizePort(variables.app.port);

const server = createServerInstance(port, 'Ecommerce Platforms 1.0!', app);

export default server;
