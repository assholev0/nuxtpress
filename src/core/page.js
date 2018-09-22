import gm from 'gray-matter';
import { readFileSync } from 'fs';
import { getFileLastUpdated } from '../lib/utils';

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
            data: Object.assign({}, page.data, edited ? { edited: new Date(edited) } : {})
          });
        }
      }
      return cached.data;
    },
    get atrributes() {
      return this.raw.data;
    }
  };
}
