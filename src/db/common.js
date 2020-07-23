import striptags from 'striptags';
import matter from 'gray-matter';

export const wordcount = (str) => {
  const content = striptags(str);
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  // eslint-disable-next-line max-len
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
  return cn + en;
};

export const parseFrontmatter = (content) => matter(content, {
  excerpt_separator: '<!-- more -->'
});

export const objectKeysToLower = (origin) => Object.keys(origin).reduce((obj, key) => {
  Object.assign(obj, { [key.toLocaleLowerCase()]: origin[key] });
  return obj;
}, {});
