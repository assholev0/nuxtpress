import { join } from 'path';
import { spawnSync } from 'child_process';
import { defaultSourceOpts } from './defaults';

export function getFileLastUpdated(file) {
  return new Date(parseInt(spawnSync('git', ['log', '-1', '--format=%ct', file]).stdout.toString('utf-8'), 10) * 1000);
}

export function nuxtpressConfig(rootDir) {
  const rootConfig = join(rootDir, 'nuxtpress.config.js');
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(rootConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    throw new Error(`[Invalid NuxtPress configuration] ${err}`);
  }
}

export function mergeSourceOpts(source) {
  const opts = {};
  if (Array.isArray(source)) {
    source.forEach((entry) => {
      const [dirName, dirOpts] = Array.isArray(entry) ? entry : [entry, {}];
      if (dirName === '/' && source.length > 1) {
        throw new Error(
          'Top level files not allowed with nested registered directories'
        );
      }
      opts[join('/', dirName)] = { ...defaultSourceOpts, ...dirOpts };
    });
  } else {
    opts['/'] = { ...defaultSourceOpts, ...source };
  }
  return opts;
}
