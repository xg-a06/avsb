/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
// const glob = require('glob');

// const indexs = glob('example/**/index.ts', { sync: true });
// const htmlPlugins = [];
// const entries = indexs.reduce((ret, file) => {
//   const [root, dir] = file.split('/');
//   ret[`${dir}`] = file;
//   htmlPlugins.push({
//     template: `${root}/${dir}/index.html`,
//     filename: `${root}/${dir}/index.html`,
//     inject: 'body',
//     minify: true,
//     chunks: [`${dir}`],
//   });
//   return ret;
// }, {});

const config = {
  entry: './src/index.ts',
  devServer: {
    port: 2333,
    proxy: {
      '/api': {
        target: 'http://10.0.70.49:8000',
        changeOrigin: true,
      },
    },
  },
  path: {
    tplPath: false,
  },
};

module.exports = config;
