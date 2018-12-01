import { resolve } from 'path';
import pkg from '../package.json';
import api from './api';

export default function () {
  // console.log(this.options);
  this.addServerMiddleware({
    path: '/api',
    handler: api(this.options)
  });
  // console.log(this.options);
  // server: { port: '9200', host: undefined, https: false },
  const { port, host = '127.0.0.1', https } = this.options.server;
  this.requireModule(['@nuxtjs/axios', {
    baseURL: `http${https ? 's' : ''}://${host}:${port}`
  }]);
  // Inject `$np` plugin
  this.addPlugin(resolve(__dirname, 'plugins/np.js'));
}

export { pkg as meta };
