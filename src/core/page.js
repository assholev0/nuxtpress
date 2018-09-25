import gm from 'gray-matter';
import strip from 'remove-markdown';
import { readFileSync } from 'fs';
import MDParser from '../lib/markdown';
import { getFileLastUpdated } from '../lib/utils';

/**
 * @namespace Page
 * @property {object} raw Raw Data
 * {
 *  @property {string} raw.content Post Body
 *  @property {object} raw.data Post Attributes
 *  {
 *   @property {string} raw.data.title Post Title
 *   @property {string|string[]} raw.data.category Category
 *   @property {string[]} raw.data.tags Tags
 *   @property {date} raw.data.date Create Time
 *   @property {date} raw.data.edited Last Update Time(*)
 *  }
 *  @property {string} raw.excerpt Post Excerpt
 * }
 * @property {number} wordcount Post Wordcount
 * @property {string} body Parsed HTML Centent
 * @property {string} permalink Permalink
 * @property {string} path Path
 * @property {[string,string][]} anchors Anchors [anchor, headingText]
 */
export default function Page(meta, options, isDev) {
  const cached = {};
  return {
    get raw() {
      if (isDev || !cached.data) {
        const source = readFileSync(meta.filePath).toString();
        if (meta.fileName.search(/\.md$/) > -1) {
          const page = gm(source);
          const edited = getFileLastUpdated(meta.filePath);
          cached.data = Object.assign(page, {
            data: Object.assign(page.data, edited ? { edited: new Date(edited) } : {})
          });
        }
        // TODO: add YAML Support
      }
      return cached.data;
    },
    get wordcount() {
      const content = strip(this.raw.content, { gfw: false, stripListLeaders: false });
      const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
      const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
      return cn + en;
    },
    get body() {
      if (isDev || !cached.body) {
        // TODO: add YAML Support and Component Support
        if (meta.fileName.search(/\.md$/) > -1) {
          cached.body = MDParser(options).render(this.raw.content);
        }
      }
      return cached.body;
    }
  };
}
