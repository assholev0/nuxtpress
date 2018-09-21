import { join } from 'path';
import { spawnSync } from 'child_process';
import { defaultSourceOpts } from './defaults';

export const getFileLastUpdated = file => new Date(parseInt(spawnSync('git', ['log', '-1', '--format=%ct', file]).stdout.toString('utf-8'), 10) * 1000);

export const nuxtpressConfig = (rootDir) => {
  const rootConfig = join(rootDir, 'nuxtpress.config.js');
  try {
    return require(rootConfig); // eslint-disable-line global-require,import/no-dynamic-require
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
      opts[join('/', dirName)] = { ...defaultSourceOpts, ...dirOpts };
    });
  } else {
    opts['/'] = { ...defaultSourceOpts, ...source };
  }
  return opts;
};
