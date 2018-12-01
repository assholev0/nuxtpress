import { resolve } from 'path';
import pkg from '../package.json';
import api from './api';

export default function () {
  // console.log(this.options);
  this.addServerMiddleware({
    path: '/api',
    handler: api(this.options)
  });
  // Inject `$np` plugin
  this.addPlugin(resolve(__dirname, 'plugins/np.js'));
}

export { pkg as meta };
