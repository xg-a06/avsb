import { existsSync } from 'fs';
import { join } from 'path';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import generateBaseConfig from './baseConfig';
import { resolve, getCssLoaders } from '../helper';
import { CustomConfig } from './typings';

const generateBuildConfig = (options: CustomConfig) => {
  const { configDir, analysis = false, workspace = './', rootDir = 'src', path: { distPath = './dist', assetPath = 'static' } = {} } = options;

  const baseConfig = generateBaseConfig(options);

  const prodConfig = {
    output: {
      path: resolve(distPath, configDir),
      filename: join(assetPath, 'js/[name].[contenthash:8].js'),
      chunkFilename: join(assetPath, 'js/[name].[contenthash:8].js'),
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'async',
            test: new RegExp(`[\\/]${rootDir}[\\/]`),
            minChunks: 2,
            minSize: 30000,
            priority: -10,
            reuseExistingChunk: true,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](antd|@ant-design|rc-.*|tinycolor2|async-validator)/,
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: 'manifest',
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 5,
            },
            compress: {
              ecma: 5,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: getCssLoaders(workspace, rootDir, configDir),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: join(assetPath, 'css/[name].[contenthash:8].css'),
        chunkFilename: join(assetPath, 'css/[name].[contenthash:8].css'),
      }),
      new ProgressBarPlugin({
        total: 100,
        format: `${chalk.blue.bold('build ') + chalk.green.bold(':percent')} (:elapsed秒)`,
      }),
    ] as Array<any>,
  };
  const publicDir = resolve(`${join(workspace, rootDir, `public`)}`, configDir);
  const toDir = resolve(`${join(distPath, assetPath)}`, configDir);
  if (existsSync(publicDir)) {
    prodConfig.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: publicDir,
            to: toDir,
          },
        ],
      }),
    );
  }
  if (analysis) {
    prodConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8899,
      }),
    );
  }

  return merge(baseConfig, prodConfig as any);
};

export default generateBuildConfig;
