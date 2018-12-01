# NuxtPress

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Follow)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/nuxtpress.svg)](https://npmjs.org/package/nuxtpress) [![npm](https://img.shields.io/npm/dm/nuxtpress.svg)](https://npmjs.org/package/nuxtpress) [![npm](https://img.shields.io/npm/dt/nuxtpress.svg)](https://npmjs.org/package/nuxtpress)

[![Build Status](https://travis-ci.org/assholev0/nuxtpress.svg?branch=master)](https://travis-ci.org/assholev0/nuxtpress) [![codebeat](https://codebeat.co/badges/d1051fe1-48b6-4a3f-8902-c98773d459e3)](https://codebeat.co/projects/github-com-assholev0-nuxtpress-master) [![codecov](https://codecov.io/gh/assholev0/nuxtpress/branch/master/graph/badge.svg)](https://codecov.io/gh/assholev0/nuxtpress) ![code-size](https://img.shields.io/github/languages/code-size/assholev0/nuxtpress.svg)


是时候表演一波真正的技术了。代码行数： 仅 **<!-- cloc -->149<!-- cloc -->** 行。

## 配置

创建 `.nuxtpress.config.js` （根目录下，与`nuxt.config.js`同级）。

```js
module.exports = {
  source: {
    permalink: '/:year/:slug'
  }
};
```

### source

文档源文件配置。支持：

#### 单类型

只有博客文章时，该参数传入一个对象。

类似：

```js
source: {
  permalink: '/:year/:slug'
}
```

## API

### `$np` 方法

`np` 是 NuxtPress 的缩写。在 Nuxt 页面中，可以这样使用：

```js
export default {
  async asyncData({app}) {
    return {
      posts: await app.$np().posts()
    }
  }
}
```

## TODO List

- [ ] add Page Render
- [ ] add API Server Middleware
- [ ] add Request Plugin
- [ ] add Build Hook

## License

[MIT](./LICENSE)
