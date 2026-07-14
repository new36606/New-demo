import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = "dist";
const files = [
  "index.html",
  "styles.css",
  "theme.css",
  "app.js",
  "flag-fix.js",
  "schedules.csv",
  "hero-bg.svg",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(file, `${outputDirectory}/${file}`);
}

console.log("Static sailing schedule website copied to dist/");
