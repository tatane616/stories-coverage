const fs = require("fs");
const path = require("path");

const componentRegExp = new RegExp(process.argv[2]);
const storiesRegExp = new RegExp(process.argv[3]);
const targetPath = process.argv[4];

const components = [];
const stories = [];

function search(root) {
  const filenames = fs.readdirSync(root);
  filenames.forEach((filename) => {
    const fullPath = path.join(root, filename);
    const stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      if (filename.match(componentRegExp)) {
        components.push(fullPath);
      } else if (filename.match(storiesRegExp)) {
        stories.push(fullPath);
      }
    } else if (stats.isDirectory()) {
      search(fullPath);
    }
  });
}

search(path.resolve(targetPath));

const coverage = (stories.length / components.length) * 100;
console.log(`coverage: ${coverage.toFixed(2)}%`);
