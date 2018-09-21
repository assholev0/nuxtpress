import gm from 'gray-matter';
import { readFileSync } from 'fs';
import { getFileLastUpdated } from '../lib/utils';

export default function Page(meta, options, isDev) {
  const cached = {};
  return {
    get _raw() {
      if (isDev || !cached.data) {
        const source = readFileSync(meta.filePath).toString();
        if (meta.fileName.search(/\.md$/) > -1) {
          const page = gm(source);
          cached.data = Object.assign(page, {
            data: Object.assign({}, page.data, {
              edited: getFileLastUpdated(meta.filePath)
            })
          });
        }
      }
      return cached.data;
    },
    get atrributes() {
      return this._raw.data;
    }
  };
}
