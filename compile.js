const fs = require('fs');
const UglifyJS = require("uglify-es");

const readme = fs.readFileSync('./README.md', 'utf8');
const js = UglifyJS.minify(fs.readFileSync('./password-generator.js', 'utf8'), { mangle: false }).code;
fs.writeFileSync(
  './README.md',
  readme.replace(/```javascript\n.*\n```/, "```javascript\njavascript:"+js+"\n```"),
  'utf8'
);
