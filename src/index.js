import pkg from '../package.json';
import { nuxtpressConfig } from './lib/utils';

export default function createModule() {
  const opts = nuxtpressConfig(this.options.rootDir) || this.options.nuxtpress || {};
}

export { pkg as meta };
