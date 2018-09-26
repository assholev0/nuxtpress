// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
// import createDatabase from './db';
import { API_SERVER_PREFIX } from '../lib/defaults';

const response = res => ({
  json(data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data), 'utf-8');
  },
  notFound() {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end();
  }
});

export default (opts) => {
  const { nuxtpress: { source } } = opts;
  const router = Router();
  // default endpoints api
  if (!source['/']) {
    router.use('/', new Router().get('/', (req, res) => response(res).json({ endpoints: Object.keys(source) })));
  }
  Object.keys(source).forEach((dirName) => {
    const handler = () => {};
    router.use(dirName, new Router().get('*', handler));
  });
  return router;
};
