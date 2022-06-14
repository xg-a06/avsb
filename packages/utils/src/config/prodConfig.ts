import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, subDir } from '../helper';

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  // target: 'web',
  // mode: isProd ? 'production' : 'development',
  // devtool: isProd ? false : 'inline-source-map',
  // resolve: {
  //   extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  //   alias: {
  //     '@': resolve('src'),
  //   },
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts[x]?$/,
  //       include: [resolve('src')],
  //       use: ['babel-loader?cacheDirectory=true'],
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif|svg)$/,
  //       use: {
  //         loader: 'url-loader',
  //         options: {
  //           name: '[name].[hash:8].[ext]',
  //           outputPath: subDir('images'),
  //           limit: 8192, // 8k以下base64
  //         },
  //       },
  //     },
  //     {
  //       test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[hash:8].[ext]',
  //         outputPath: subDir('media'),
  //       },
  //     },
  //     {
  //       test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[hash:8].[ext]',
  //         outputPath: subDir('fonts'),
  //       },
  //     },
  //   ],
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: resolve('index.html'),
  //     filename: 'index.html',
  //     minify: true,
  //   }),
  // ],
};

export default baseConfig;
