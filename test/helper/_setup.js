const hook = require('node-hook');
const browserEnv = require('browser-env');
require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
});

browserEnv(['window', 'document', 'navigator']);


const convertSCSS = source => (
  `module.exports = ${
    JSON.stringify(
      source
        .match(/\.(.*?)\{/gm)
        .map(name => name.slice(1, -1).trim())
        .filter(name => name)
        .reduce((obj, cur) => ({ __esModule: void 0, [cur]: cur, ...obj }), {})
      )
    }`
);
hook.hook('.scss', convertSCSS);
