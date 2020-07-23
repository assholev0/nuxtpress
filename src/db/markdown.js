const MD = require('markdown-it');
const anchor = require('markdown-it-anchor');
const toc = require('markdown-it-table-of-contents');
const slugify = require('./slugify');

const md = MD({
  html: true
})
  .use(anchor, { slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#' })
  .use(toc, { slugify,
    includeLevel: [2, 3] });

module.exports = md;
