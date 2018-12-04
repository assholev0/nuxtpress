export default ({ hotReload, route, app, isStatic }, inject) => {
  // none biz of context
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) { return; }

  const cache = {};

  const fetchContent = async (endpoint, search) => {
    const key = endpoint.replace(/(?!^\/)(\/)/g, '.');
    if (isStatic) {
      return {};
    }
    if (!cache[key]) {
      cache[key] = (await app.$axios.get(`/api/${key}${search ? `/${search}` : ''}`)).data;
    }
    return cache[key];
  };

  const handler = new Proxy({}, {
    get: (target, property) => search => fetchContent(property.toLowerCase(), search)
  });
  // short for nuxtpress
  inject('np', handler);
};
