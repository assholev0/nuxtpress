export default nuxtpressConfig => ({
  buildDir: '.nuxt',
  generate: {
    dir: '.dist',
    minify: false
  },
  dev: false,
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  nuxtpress: {
    ...nuxtpressConfig,
    baseURL: `http://localhost:${process.env.PORT}`
  }
});
