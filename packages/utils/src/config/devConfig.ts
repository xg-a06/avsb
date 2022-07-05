import { existsSync } from 'fs';
import { join } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import generateBaseConfig from './baseConfig';
import { resolve, getCssLoaders } from '../helper';
import { CustomConfig } from './typings';

const generateDevConfig = (options: CustomConfig) => {
  const { configDir, workspace = './', rootDir = 'src', devServer, path: { distPath = './dist', assetPath = 'static' } = {}, custom = {} } = options;

  const baseConfig = generateBaseConfig(options);

  const devConfig = {
    cache: {
      type: 'filesystem',
    },
    experiments: {
      lazyCompilation: true,
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    output: {
      filename: '[name].js',
      path: resolve(distPath, configDir),
    },
    devServer: {
      hot: true,
      host: '0.0.0.0',
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      historyApiFallback: {
        disableDotRule: true,
      },
      ...devServer,
    },
    module: {
      rules: getCssLoaders(workspace, rootDir, configDir),
    },
    plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin(), new ESLintPlugin()] as Array<any>,
  };
  const publicDir = resolve(`${join(workspace, rootDir, `public`)}`, configDir);
  if (existsSync(publicDir)) {
    const toDir = resolve(`${join(distPath, assetPath)}`, configDir);
    devConfig.plugins.push(
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
  return merge(baseConfig, devConfig, custom);
};

export default generateDevConfig;
