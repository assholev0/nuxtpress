import assert from 'assert';
import globby from 'globby';
import path from 'path';
import fs from 'fs';
import { wordcount, parseFrontmatter, objectKeysToLower } from './common';
import md from './markdown';

export default async (sourceDir) => {
  const postFiles = await globby(['**/*.md'], { cwd: sourceDir }).then(arr => arr.sort((x, y) => (x > y ? 1 : -1)));

  return Promise.all(postFiles.map(async (file) => {
    const filepath = path.resolve(sourceDir, file);
    let markdown = fs.readFileSync(filepath, 'utf-8');
    // 修复部分配置不规范
    if (!markdown.startsWith('---')) {
      markdown = `--- \n${markdown}`;
    }
    const { content = '', data, excerpt = '' } = parseFrontmatter(markdown);
    const { title, date, slug = file.replace(/^\d{2,4}-?\d{1,2}-?\d{1,2}-?([\w-]+).md$/, '$1'), ...meta } = objectKeysToLower(data);
    const tags = meta.tags || meta.tag;
    const category = meta.category || meta.categories;
    assert.ok(!~slug.indexOf('.md'), `${file} needs a slug!`);
    return {
      content: md.render(content),
      excrept: md.render(excerpt),
      wordcount: wordcount(content),
      tags: Array.isArray(tags) ? tags : [tags],
      category: Array.isArray(category) ? category : [category],
      title,
      date,
      slug
    };
  })).then(posts => ({
    posts,
    ...posts.reduce((total, post) => {
      post.tags.forEach((tag) => {
        const i = total.tags.findIndex(x => x.name === tag);
        if (i === -1) {
          total.tags.push({ name: tag, count: 1 });
        } else {
          Object.assign(total.tags[i], {
            count: total.tags[i].count + 1
          });
        }
      });
      post.category.forEach((cat) => {
        const i = total.categories.findIndex(x => x.name === cat);
        if (i === -1) {
          total.categories.push({ name: cat, count: 1 });
        } else {
          Object.assign(total.categories[i], {
            count: total.categories[i].count + 1
          });
        }
      });
      Object.assign(total, {
        wordcount: total.wordcount + post.wordcount
      });
      return total;
    }, { tags: [], wordcount: 0, categories: [] })
  }));
};
