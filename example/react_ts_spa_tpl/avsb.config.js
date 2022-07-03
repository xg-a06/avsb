const path = require('path');

const config = {
  entry: './src/index.tsx',
  analysis: false,
  devServer: {
    port: 2233,
    proxy: {
      '/api': {
        target: 'http://10.0.70.49:8000',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/xxx': '/',
        // },
      },
    },
  },
  preview: {
    port: 19000,
  },
  path: {},
  variables: {
    NODE_ENV: process.env.NODE_ENV,
    API_PATH: '/api',
  },
  override(options) {
    delete options.module.rules[1].include;
    options.module.rules[1].exclude = [path.resolve(__dirname, 'node_modules')];
    return options;
  },
};

module.exports = config;
