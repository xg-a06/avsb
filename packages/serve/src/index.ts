import { resolve, dirname } from 'path';
import { generateDevConfig, CustomConfig, Webpack, Configuration, WebpackDevServer } from '@avsb/utils';

// import { createServer, InlineConfig } from 'vite';

interface ServeOptions {
  config: string;
  engine: string;
}

const startWebpack = async (options: CustomConfig) => {
  let webpackConfig = generateDevConfig(options);
  if (options.override) {
    webpackConfig = options.override(webpackConfig);
  }
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
//   await server.listen();s
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
