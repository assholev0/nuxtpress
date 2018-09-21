import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

const version = process.env.VERSION || pkg.version;
const external = Object.keys(pkg.dependencies || {});

const corePlugins = [
  resolve({
    preferBuiltins: false
  }),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    babelrc: false,
    presets: [['env', { modules: false, targets: { node: '8.0' } }], 'stage-2']
    // plugins: [
    //   'transform-async-to-generator',
    //   'transform-regenerator',
    //   [
    //     'transform-object-rest-spread',
    //     {
    //       useBuiltIns: true
    //     }
    //   ],
    //   'external-helpers'
    // ]
  }),
  uglify(),
  filesize()
];

const bundle = (name, options) => ({
  input: `src/${name}.js`,
  output: {
    file: `dist/${name}.js`,
    format: 'cjs',
    exports: 'named'
  },
  name: 'NuxtPress',
  plugins: options.plugins || [],
  external: options.external || [],
  globals: options.globals || {},
  banner: `
    /**
    * NuxtPress v${version}
    * (c) ${new Date().getFullYear()} Willin Wang
    * @license MIT
    */
   `
});

export default [
  bundle('index', {
    plugins: [
      json(),
      copy({
        'src/plugins': 'dist/plugins',
        'src/loader.js': 'dist/loader.js'
      }),
      ...corePlugins
    ],
    external: ['path', 'fs', 'querystring', 'express', 'axios', ...external],
    globals: {
      express: 'express'
    }
  })
];
