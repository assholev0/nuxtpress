export default ({ hotReload, route, app, isStatic }, inject) => {
  // none biz of context
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) { return; }

  const cache = {};
  const isAPI = process.server || !isStatic;

  const fetchContent = async (endpoint, search = '') => {
    if (isAPI) {
      const key = endpoint.replace(/(?!^\/)(\/)/g, '.');
      if (!isStatic || !cache[key]) {
        cache[key] = (await app.$axios.get(`/api/${key}${search ? `/${search}` : ''}`)).data;
      }
      return cache[key];
    }
    if (process.client) {
      // eslint-disable-next-line no-param-reassign
      app.$axios.defaults.baseURL = '/';
      const key = endpoint.replace(/(?!^\/)(\/)/g, '.');
      if (!cache[key]) {
        cache[key] = (await app.$axios.get(`/_nuxt/api/${key}${search ? `_${search}` : ''}.json`)).data;
      }
      return cache[key];
    }
    return {};
  };

  const handler = new Proxy({}, {
    get: (target, property) => search => fetchContent(property.toLowerCase(), search)
  });
  // short for nuxtpress
  inject('np', handler);
};
