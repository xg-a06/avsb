import { existsSync } from 'fs';
import { join } from 'path';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import BundleDeclarationsWebpackPlugin from 'bundle-declarations-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import generateBaseConfig from './baseConfig';
import { resolve, getCssLoaders } from '../helper';
import { CustomConfig } from './typings';

const generateLibBuildConfig = (options: CustomConfig) => {
  const { configDir, analysis = false, workspace = './', entry = './src/index.js', rootDir = 'src', path: { distPath = './dist', assetPath = 'static' } = {}, custom = {} } = options;

  const baseConfig = generateBaseConfig(options);

  const prodConfig = {
    output: {
      path: resolve(distPath, configDir),
      filename: '[name].js',
      library: {
        type: 'umd',
      },
    },
    optimization: {
      minimize: true,
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
  if ((entry as string).indexOf('ts') !== -1) {
    prodConfig.plugins.push(
      new BundleDeclarationsWebpackPlugin({
        entry: [resolve(`${entry}`, configDir)],
        outFile: 'index.d.ts',
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

  return merge(baseConfig, prodConfig, custom);
};

export default generateLibBuildConfig;
