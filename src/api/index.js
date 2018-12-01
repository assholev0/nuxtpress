import db from '../db';

export default (options) => {
  const { src = '_source' } = options.nuxtpress || { };
  return async (req, res) => {
    const { posts, tags, categories, wordcount } = await db(src);
    const url = req.originalUrl;

    res.end(JSON.stringify({
      posts,
      tags
    }), 'utf-8');
  };
};
