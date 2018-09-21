import { readFileSync } from 'fs';

import gm from 'gray-matter';

export default function page(meta, options, isDev) {
  const cached = {};
  return {
    get _rawData() {
      if (isDev || !cached.data) {
        const source = readFileSync(meta.filePath).toString();
        if (meta.fileName.search(/\.md$/) > -1) {
          cached.data = gm(source);
        }
      }
      return cached.data;
    }
  };
}
