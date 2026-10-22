const fs = require('node:fs'); const path = require('node:path');
for (const name of fs.readdirSync('nodes')) { const dir = path.join('nodes', name); for (const file of fs.readdirSync(dir)) { if (file.endsWith('.svg')) fs.copyFileSync(path.join(dir, file), path.join('dist', dir, file)); } }

fs.copyFileSync('credentials/apivault.svg', 'dist/credentials/apivault.svg');
