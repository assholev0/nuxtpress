import { resolve, join } from 'path';
import pkg from '../package.json';
import api from './api';

const nuxtpressConfig = (rootDir) => {
  try {
    const rootConfig = join(rootDir, 'nuxtpress.config.js');
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(rootConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') { return false; }
    throw new Error(`[Invalid NuxtPress configuration] ${err}`);
  }
};

export default function () {
  const { head, nuxtpress = nuxtpressConfig(this.options.rootDir) } = this.options;
  this.addServerMiddleware({
    path: '/api',
    handler: api({ head, nuxtpress })
  });
  const { port, host = '127.0.0.1', https } = this.options.server;
  this.requireModule(['@nuxtjs/axios', {
    baseURL: `http${https ? 's' : ''}://${host}:${port}`
  }]);
  // Inject `$np` plugin
  this.addPlugin(resolve(__dirname, 'plugins/np.js'));
}

export { pkg as meta };
