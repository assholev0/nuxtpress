import { join } from 'path';
import { readdirSync, statSync } from 'fs';

export default function createDatabase(sourceDir, dirName, dirOpts, isDev) {
  const dirPath = join(sourceDir, dirName);
  const stats = readdirSync(dirPath).reverse();
  console.log(stats);
}
