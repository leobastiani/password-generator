const fs = require('fs');
const UglifyJS = require('uglify-es');
const clipboardy = require('clipboardy');

const readme = fs.readFileSync('./README.md', 'utf8');
const code = fs.readFileSync('./password-generator.js', 'utf8');
const js = UglifyJS.minify(code, { mangle: false }).code;
fs.writeFileSync(
  './README.md',
  readme.replace(/```javascript\n.*\n```/, "```javascript\njavascript:"+js+"\n```"),
  'utf8'
);

clipboardy.writeSync(code);
