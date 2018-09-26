import { resolve, join } from 'path';
import pkg from '../package.json';
import apiHandler from './core/api';
import { nuxtpressConfig, mergeSourceOpts, getBaseURL } from './lib/utils';
import { API_SERVER_PREFIX } from './lib/defaults';

export default function createModule() {
  const opts = nuxtpressConfig(this.options.rootDir) || this.options.nuxtpress || {};
  this.options.nuxtpress = Object.assign(opts, { source: mergeSourceOpts(opts.source), baseURL: getBaseURL(this.options, opts.baseURL) });
  // addServerMiddleware
  this.addServerMiddleware({ path: API_SERVER_PREFIX, handler: apiHandler(this.options) });
  // Inject `$context` plugin
  this.addPlugin(resolve(__dirname, 'plugins/context.js'));
  // Init axios module(*)
}

export { pkg as meta };
