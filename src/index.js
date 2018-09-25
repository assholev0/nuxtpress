import { resolve } from 'path';
import pkg from '../package.json';
import { nuxtpressConfig, mergeSourceOpts } from './lib/utils';

export default function createModule() {
  const opts = nuxtpressConfig(this.options.rootDir) || this.options.nuxtpress || {};
  const sourceOpts = mergeSourceOpts(opts.source);
  // Inject `$context` plugin
  this.addPlugin(resolve(__dirname, 'plugins/context.js'));
  // addServerMiddleware
  // Init axios module(*)
}

export { pkg as meta };
