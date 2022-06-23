import { join } from 'path';
import os from 'os';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, subDir } from '../helper';
import { CustomConfig } from './typings';

const isProd = process.env.NODE_ENV === 'production';
const threads = os.cpus().length / 2;

const generateBaseConfig = (config: CustomConfig) => {
  const { configDir, workspace = './', rootDir = 'src', entry, path: { assetPath = 'static', tplPath = './index.html' } = {}, variables } = config;

  const defines = Object.entries(variables).reduce((tmp, [key, value]) => {
    tmp[key] = JSON.stringify(value);
    return tmp;
  }, {} as Record<string, string>);

  const baseConfig = {
    target: 'web',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'inline-source-map',
    entry: resolve(`${entry}`, configDir),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': resolve(`${join(workspace, rootDir)}`, configDir),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [resolve(join(workspace, 'node_modules/zustand/esm/middleware.js'), configDir), resolve(join(workspace, 'node_modules/react-query/es/devtools/devtools.js'), configDir), resolve(join(workspace, 'node_modules/react-query/es/devtools/utils.js'), configDir)],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 开启babel编译缓存
                cacheCompression: false, // 缓存文件不要压缩
              },
            },
          ],
        },
        {
          test: /\.ts[x]?$/,
          include: [resolve(join(workspace, rootDir), configDir)],
          use: [
            {
              loader: 'thread-loader', // 开启多进程
              options: {
                workers: threads, // 数量
              },
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 开启babel编译缓存
                cacheCompression: false, // 缓存文件不要压缩
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          include: [resolve(join(workspace, rootDir), configDir)],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: `${subDir('images', assetPath)}/[hash:8][ext][query]`,
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          include: [resolve(join(workspace, rootDir), configDir)],
          type: 'asset/resource',
          generator: {
            filename: `${subDir('media', assetPath)}/[hash:8][ext][query]`,
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          include: [resolve(join(workspace, rootDir), configDir)],
          type: 'asset/resource',
          generator: {
            filename: `${subDir('fonts', assetPath)}/[hash:8][ext][query]`,
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(tplPath, configDir),
        filename: 'index.html',
        minify: true,
      }),
      new DefinePlugin({
        'process.env': {
          ...defines,
        },
      }),
    ],
  };

  return baseConfig;
};

export default generateBaseConfig;
