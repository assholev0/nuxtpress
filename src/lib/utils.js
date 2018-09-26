import { join } from 'path';
import { spawnSync } from 'child_process';

export const getFileLastUpdated = file => parseInt(spawnSync('git', ['log', '-1', '--format=%ct', file]).stdout.toString('utf-8'), 10) * 1000 || false;

export const nuxtpressConfig = (rootDir) => {
  try {
    const rootConfig = join(rootDir, 'nuxtpress.config.js');
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(rootConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') { return false; }
    throw new Error(`[Invalid NuxtPress configuration] ${err}`);
  }
};

export const mergeSourceOpts = (source) => {
  const opts = {};
  if (Array.isArray(source)) {
    source.forEach((entry) => {
      const [dirName, dirOpts] = Array.isArray(entry) ? entry : [entry, {}];
      if (dirName === '/' && source.length > 1) { throw new Error('Top level files not allowed with nested registered directories'); }
      opts[join('/', dirName)] = { ...dirOpts };
    });
  } else {
    opts['/'] = { ...source };
  }
  return opts;
};

export const getBaseURL = (opts, api = {}, isStatic = false) => (typeof api === 'function' ? api(isStatic) : api) || `http${opts.server.https ? 's' : ''}://${opts.server.host || 'localhost'}:${opts.server.port || '3000'}`;
