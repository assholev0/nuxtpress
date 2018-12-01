export default ({ hotReload, route, app }, inject) => {
  // none biz of context
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) { return; }

  const cache = {};

  const fetchContent = async (endpoint) => {
    const key = endpoint.replace(/(?!^\/)(\/)/g, '.');
    console.log(key);
    if (!cache[key]) {
      cache[key] = (await app.$axios.get('http://localhost:9200/api').catch(e => console.error(e))).data;
    }
    return cache[key];
  };

  const handler = new Proxy({}, {
    get: (target, property) => opts => fetchContent(property.toLowerCase(), opts)
  });
  // short for nuxtpress
  inject('np', handler);
};
