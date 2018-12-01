const db = require('../db');

export default async (options) => {
  const { src = '_source' } = options.nuxtpress;
  const { posts, tags, categories, wordcount } = await db(src);
  return (req, res) => {
    console.log(req);
  };
};
