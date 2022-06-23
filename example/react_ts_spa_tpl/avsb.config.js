const config = {
  entry: './src/index.tsx',
  analysis: true,
  devServer: {
    port: 2233,
    proxy: {
      '/api': {
        target: 'http://10.0.70.49:8000',
        changeOrigin: true,
      },
    },
  },
  path: {
    publicPath: 'aaaa',
  },
  variables: {
    NODE_ENV: process.env.NODE_ENV,
    API_PATH: '/api',
  },
};

module.exports = config;
