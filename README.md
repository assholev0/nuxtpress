# NuxtPress

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Follow)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/nuxtpress.svg)](https://npmjs.org/package/nuxtpress) [![npm](https://img.shields.io/npm/dm/nuxtpress.svg)](https://npmjs.org/package/nuxtpress) [![npm](https://img.shields.io/npm/dt/nuxtpress.svg)](https://npmjs.org/package/nuxtpress) [![codebeat](https://codebeat.co/badges/d1051fe1-48b6-4a3f-8902-c98773d459e3)](https://codebeat.co/projects/github-com-assholev0-nuxtpress-master) ![code-size](https://img.shields.io/github/languages/code-size/assholev0/nuxtpress.svg)


是时候表演一波真正的技术了。代码行数： 仅 **<!-- cloc -->268<!-- cloc -->** 行。

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [配置](#%E9%85%8D%E7%BD%AE)
- [API](#api)
  - [`$np` 方法](#np-%E6%96%B9%E6%B3%95)
  - [info 基本信息](#info-%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF)
  - [posts 文章列表](#posts-%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8)
  - [post 文章](#post-%E6%96%87%E7%AB%A0)
  - [tags 标签](#tags-%E6%A0%87%E7%AD%BE)
  - [categories 分类](#categories-%E5%88%86%E7%B1%BB)
  - [archives 归档](#archives-%E5%BD%92%E6%A1%A3)
- [TODO List](#todo-list)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 配置

创建 `.nuxtpress.config.js` （根目录下，与`nuxt.config.js`同级）。

```js
module.exports = {
  source: '_source', // 默认文章目录
  per_page: 10, // 默认分页 10/页， 0 为关闭分页
};
```

## API

### `$np` 方法

`np` 是 NuxtPress 的缩写。在 Nuxt 页面中，可以这样使用：

```js
export default {
  async asyncData({app}) {
    return {
      posts: await app.$np.posts(1)
    }
  }
}
```

### info 基本信息

```js
app.$np.info()
```

返回：

```js
{
title: "初瘦",
description: "想当初，也瘦过。公众号：assholev0",
posts: 3,
tags: 4,
categories: 2,
wordcount: 2451
}
```

### posts 文章列表

```js
app.$np.posts(page)
```

参数：

- page： 页码 （默认为1）

返回：

```js
{
  "page": 1,
  "pages": 1,
  "posts": [
    {
      "excrept": "<h2>此处是摘要</h2>",
      "wordcount": 1191,
      "tags": [
        "生活"
      ],
      "category": [
        "闲聊"
      ],
      "title": "初瘦与那些他的三观不正的杂念",
      "date": "2018-09-19T07:19:29.000Z",
      "slug": "assholev0"
    }
    // 。。。
  ]
}
```

### post 文章


```js
app.$np.post(slug)
```

参数：

- slug： 文章别名，必须

返回：

```js
{
  "post": {
    "content": "<h2 id=\"何谓初瘦？\"><a class=\"header-anchor\" href=\"#何谓初瘦？\" aria-hidden=\"true\">#</a> 何谓初瘦？</h2>。。。。。。",
    "excrept": "<h2>此处是摘要</h2>",
    "wordcount": 1191,
    "tags": [
      "生活"
    ],
    "category": [
      "闲聊"
    ],
    "title": "初瘦与那些他的三观不正的杂念",
    "date": "2018-09-19T07:19:29.000Z",
    "slug": "assholev0"
  }
}
```

### tags 标签

```js
app.$np.tags(search)
```

参数：

- search： 传入标签名称，查询标签下的日志 （默认为空）

返回：

```js
{
  "tags": [
    {
      "name": "vue",
      "count": 1
    },
    {
      "name": "vuepress",
      "count": 1
    },
    {
      "name": "前端",
      "count": 1
    },
    {
      "name": "生活",
      "count": 2
    }
  ],
  "posts": [
    {
      "excrept": "<h2>此处是摘要</h2>",
      "wordcount": 1191,
      "tags": [
        "生活"
      ],
      "category": [
        "闲聊"
      ],
      "title": "初瘦与那些他的三观不正的杂念",
      "date": "2018-09-19T07:19:29.000Z",
      "slug": "assholev0"
    }
  ]
}
```

### categories 分类

```js
app.$np.categories(search)
```

参数：

- search： 传入分类名称，查询分类下的日志 （默认为空）

返回：

```js
{
  "categories": [
    {
      "name": "技术",
      "count": 1
    },
    {
      "name": "闲聊",
      "count": 2
    }
  ],
  "posts": [
    {
      "excrept": "<h2>此处是摘要</h2>",
      "wordcount": 1191,
      "tags": [
        "生活"
      ],
      "category": [
        "闲聊"
      ],
      "title": "初瘦与那些他的三观不正的杂念",
      "date": "2018-09-19T07:19:29.000Z",
      "slug": "assholev0"
    }
  ]
}
```

### archives 归档

```js
app.$np.archives()
```

返回：

```js
{
  "posts": [
    {
      "wordcount": 1191,
      "tags": [
        "生活"
      ],
      "category": [
        "闲聊"
      ],
      "title": "初瘦与那些他的三观不正的杂念",
      "date": "2018-09-19T07:19:29.000Z",
      "slug": "assholev0"
    },
    // 。。。
  ]
}
```

## TODO List

- [ ] add Page Render
- [x] add API Server Middleware
- [x] add Request Plugin
- [ ] add Build Hook

## License

[MIT](./LICENSE)
