export default ({ hotReload, route, app, isStatic }, inject) => {
  // none biz of context
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) { return; }

  const cache = {};
  const isAPI = process.server || !isStatic;

  const fetchContent = async (endpoint, search = '') => {
    const key = endpoint.replace(/(?!^\/)(\/)/g, '.');
    const cachedKey = `${key}${search}`;
    if (isAPI) {
      if (!isStatic || !cache[cachedKey]) {
        cache[cachedKey] = (await app.$axios.get(`/api/${key}${search ? `/${search}` : ''}`)).data;
      }
      return cache[cachedKey];
    }
    if (process.client) {
      // eslint-disable-next-line no-param-reassign
      app.$axios.defaults.baseURL = '/';
      if (!cache[cachedKey]) {
        cache[cachedKey] = (await app.$axios.get(`/_nuxt/api/${key}${search ? `_${search}` : ''}.json`)).data;
      }
      return cache[cachedKey];
    }
    return {};
  };

  const handler = new Proxy({}, {
    get: (target, property) => (search) => fetchContent(property.toLowerCase(), search)
  });
  // short for nuxtpress
  inject('np', handler);
};
