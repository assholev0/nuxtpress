import { join } from 'path';

export default ({ hotReload, route, app }, inject) => {
  // none biz of context
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) { return; }

  const cache = {};

  const fetchContent = async (path, endpoint) => {
    const key = join(path, endpoint).replace(/(?!^\/)(\/)/g, '.');
    if (!cache[key]) {
      cache[key] = (await app.$axios.get(`${key}.json`)).data;
    }
    return cache(key);
  };

  const handler = (source = '') => new Proxy({}, {
    get: (target, property) => opts => fetchContent(`/${source}`, property.toLowerCase(), opts)
  });
  // short for nuxtpress
  inject('np', handler);
};
