import express from 'express';
import { resolve, join } from 'path';
import pkg from '../package.json';
import api from './api';
import db from './db';

const nuxtpressConfig = (rootDir) => {
  try {
    const rootConfig = join(rootDir, 'nuxtpress.config.js');
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(rootConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') { return false; }
    throw new Error(`[Invalid NuxtPress configuration] ${err}`);
  }
};

export default function () {
  const { head, generate, nuxtpress = nuxtpressConfig(this.options.rootDir) } = this.options;
  this.addServerMiddleware({ path: '/api', handler: api({ head, nuxtpress, generate }) });
  const { port, host = '127.0.0.1', https } = this.options.server;
  // Inject `$np` plugin
  this.addPlugin(resolve(__dirname, 'plugins/np.js'));

  this.nuxt.hook('build:before', (builder) => {
    // eslint-disable-next-line no-mixed-operators
    this.requireModule(['@nuxtjs/axios', { baseURL: `http${https ? 's' : ''}://${host}:${port}`, browserBaseURL: builder.isStatic && nuxtpress.browserBaseURL || '' }]);
  });

  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    const { src = '_source', per_page: perPage = 10 } = nuxtpress;
    const { posts, tags, categories } = await db(src);
    const pages = Math.ceil(posts.length / perPage);
    [...new Array(pages - 1).fill(pages).map((x, i) => `/page/${x - i}`),
      ...tags.map((tag) => `/tags/${tag.name}`),
      ...categories.map((category) => `/categories/${category.name}`),
      ...posts.map((post) => `/p/${post.slug}`)
    ].forEach((route) => {
      routes.push({ route, payload: null });
    });
  });

  this.nuxt.hook('generate:before', () => {
    const app = express();
    app.use('/api', api({ head, nuxtpress, generate }));
    const server = app.listen(port, host);

    this.nuxt.hook('generate:done', () => {
      server.close();
    });
  });
}

export { pkg as meta };
