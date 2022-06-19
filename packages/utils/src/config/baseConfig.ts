import { join } from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, subDir } from '../helper';
import { CustomConfig } from './typings';

const isProd = process.env.NODE_ENV === 'production';

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
          test: /\.ts[x]?$/,
          include: [resolve(join(workspace, rootDir), configDir)],
          use: ['babel-loader?cacheDirectory=true'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: subDir('images', assetPath),
              limit: 8192, // 8k以下base64
            },
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: subDir('media', assetPath),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: subDir('fonts', assetPath),
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
