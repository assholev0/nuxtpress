const cp = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

const file = 'README.md';
const seperator = '<!-- cloc -->';
const regexp = new RegExp(`${seperator}\\d+${seperator}`);

// 计算代码行数
const { JavaScript: { code = 0 } = {} } = JSON.parse(cp.spawnSync('./node_modules/.bin/cloc', ['--ignore-whitespace', '--quiet', '--json', './src']).stdout.toString('utf-8'));

// 更新到 README.md
const md = readFileSync(file, 'utf-8');
writeFileSync(file, md.replace(regexp, `${seperator}${code}${seperator}`), 'utf-8');
