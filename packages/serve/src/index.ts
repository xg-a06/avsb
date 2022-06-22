import { resolve, dirname } from 'path';
import { generateDevConfig, CustomConfig, Webpack, Configuration } from '@avsb/utils';
import WebpackDevServer from 'webpack-dev-server';
// import { createServer, InlineConfig } from 'vite';

interface ServeOptions {
  config: string;
  engine: string;
}

const startWebpack = async (options: CustomConfig) => {
  const webpackConfig = generateDevConfig(options);
  const compiler = Webpack(webpackConfig as unknown as Configuration);
  const devServerOptions = { ...webpackConfig.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

// const startVite = async (options: CustomConfig) => {
//   const viteConfig = generateViteConfig(options);
//   const server = await createServer({
//     configFile: false,
//     ...(viteConfig as any as InlineConfig),
//   });
//   await server.listen();
//   server.printUrls();
// };

const serve = async (options: ServeOptions) => {
  const { config } = options;
  const configPath = resolve(process.cwd(), config);
  const configDir = dirname(configPath);
  const customConfig = await import(configPath);
  customConfig.configDir = configDir;
  startWebpack(customConfig);
  // switch (engine) {
  //   case 'webpack':
  //     await startWebpack(CustomConfig);
  //     break;
  //   case 'vite':
  //     await startVite(CustomConfig);
  //     break;
  //   default:
  //     console.log('error engine');
  // }
};

export default serve;
