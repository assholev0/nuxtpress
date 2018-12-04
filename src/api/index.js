import db from '../db';

const cache = {};
const getCache = () => {
  const timestamp = new Date();
  if (cache.expires && cache.expires > timestamp) {
    return cache.data;
  }
  return false;
};

const setCache = (data) => {
  Object.assign(cache, {
    data,
    expires: new Date() + 1e4
  });
  return data;
};

export default ({
  head: { title = '', meta = [] } = {},
  nuxtpress: { src = '_source', per_page: perPage = 10 } = {}
} = {}) => async (req, res) => {
  const { posts, tags, categories, wordcount } = getCache() || await db(src).then(setCache);
  const { url } = req;

  const { content: description = '' } = meta.find(x => x.name === 'description') || {};
  const json = d => res.end(JSON.stringify(d), 'utf-8');
  const [, type = '', search = ''] = url.split('/');

  switch (type) {
    case 'info': {
      json({
        title,
        description,
        posts: posts.length,
        tags: tags.length,
        categories: categories.length,
        wordcount
      });
      break;
    }
    case 'tags': {
      json({
        tags,
        posts: posts.map((origin) => {
          const { content, ...post } = origin;
          return post;
        }).filter(post => post.tags.includes(decodeURI(search)))
      });
      break;
    }
    case 'categories': {
      json({
        categories,
        posts: posts.map((origin) => {
          const { content, ...post } = origin;
          return post;
        }).filter(post => post.category.includes(decodeURI(search)))
      });
      break;
    }
    case 'archives': {
      json({
        posts: posts.map((origin) => {
          const { content, excrept, ...post } = origin;
          return post;
        })
      });
      break;
    }
    case 'posts': {
      const tmpPosts = posts.map((origin) => {
        const { content, ...post } = origin;
        return post;
      });
      const page = +search || 1;
      const size = perPage === 0 ? tmpPosts.length : perPage;
      const pages = Math.ceil(tmpPosts.length / size);
      json({
        page,
        pages,
        posts: tmpPosts.splice((page - 1) * size, size)
      });
      break;
    }
    case 'post': {
      const origin = posts.find(x => x.slug === decodeURI(search)) || {};
      const { excrept, ...post } = origin;
      json({
        post
      });
      break;
    }
    default: {
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.end();
    }
  }
};
