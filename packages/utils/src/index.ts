import Webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import generateDevConfig from './config/devConfig';
import generateBuildConfig from './config/prodConfig';
import generateLibBuildConfig from './config/prodLibConfig';
// import generateViteConfig from './config/viteConfig';
export { CustomConfig } from './config/typings';
export { generateDevConfig, generateBuildConfig, generateLibBuildConfig, Webpack, Configuration, WebpackDevServer, chalk };
