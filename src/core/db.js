import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import getPage from './page';

const glob = (sourceDir, dirName, dirOpts, isDev) => {
  const fileStore = new Map();
  const dirPath = join(sourceDir, dirName);
  const dir = readdirSync(dirPath).reverse();
  dir.forEach((fileName) => {
    const filePath = join(dirPath, fileName);
    if (statSync(filePath).isFile()) {
      getPage({ fileName, dirName, filePath }, dirOpts, isDev);
    }
  });
  return fileStore;
};

export default function createDatabase(sourceDir, dirName, dirOpts, isDev) {
  glob(sourceDir, dirName, dirOpts, isDev);
}
