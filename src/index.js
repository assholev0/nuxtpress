import { resolve } from 'path';
import pkg from '../package.json';

export default function () {
  this.addPlugin(resolve(__dirname, 'plugins/context.js'));
}

export { pkg as meta };
