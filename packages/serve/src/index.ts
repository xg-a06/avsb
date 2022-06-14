import { resolve, dirname } from 'path';
import { generateDevConfig } from '@avsb/utils';
import Webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

interface ServeOptions {
  config: string;
}

const serve = async (options: ServeOptions, xxx: any) => {
  console.log(options, xxx.opts());

  const configPath = resolve(process.cwd(), options.config);
  const configDir = dirname(configPath);
  const CustomConfig = await import(configPath);
  CustomConfig.configDir = configDir;
  const config = generateDevConfig(CustomConfig);
  const compiler = Webpack(config as unknown as Configuration);
  const devServerOptions = { ...config.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

export default serve;
