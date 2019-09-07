const glob = require('glob');

let entry = __dirname + "/src/index.js";
let outputPath = __dirname + "/dist/";

if (process.env.TESTING) {
  entry = glob.sync(__dirname + "/tests/**/*.test.js");
  outputPath = __dirname + "/test-dist/";
}

module.exports = {
  entry: entry,
  output: {
    filename: 'bundle.js',
    path: outputPath
  },
};