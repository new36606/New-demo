import { cp, mkdir, rm } from 'node:fs/promises';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js', 'schedules.csv']) {
  await cp(file, `${out}/${file}`);
}

console.log('Static sailing schedule site copied to dist/');
