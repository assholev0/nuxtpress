export default ({ app, isStatic, hotReload, route }) => {
  // check context request
  if (hotReload || route.fullPath.includes('__webpack_hmr?') || route.fullPath.includes('.hot-update.')) {
    return;
  }
  const isAPI = process.server || !isStatic;

};
