import { resolve, dirname } from 'path';
import { generateBuildConfig, CustomConfig, Webpack, Configuration, chalk } from '@avsb/utils';

interface BuildOptions {
  config: string;
}

const buildWebpack = async (options: CustomConfig) => {
  let webpackConfig = generateBuildConfig(options);
  if (options.override) {
    webpackConfig = options.override(webpackConfig);
  }
  Webpack(webpackConfig as unknown as Configuration, (err, stats) => {
    if (err) throw err;
    if (!stats) throw new Error('no stats');
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })}\n\n`,
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }
  });
};

const build = async (options: BuildOptions) => {
  const { config } = options;
  const configPath = resolve(process.cwd(), config);
  const configDir = dirname(configPath);
  const customConfig: CustomConfig = await import(configPath);
  customConfig.configDir = configDir;
  buildWebpack(customConfig);
};

export default build;
