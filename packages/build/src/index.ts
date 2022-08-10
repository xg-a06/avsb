import { resolve, dirname } from 'path';
import { generateBuildConfig, generateLibBuildConfig, CustomConfig, Webpack, Configuration, chalk } from '@avsb/utils';

interface BuildOptions {
  config: string;
  lib: boolean;
}

const buildWebpack = async (options: CustomConfig, isLib: boolean) => {
  let webpackConfig;
  if (isLib) {
    webpackConfig = generateLibBuildConfig(options);
  } else {
    webpackConfig = generateBuildConfig(options);
  }
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
  const { config, lib } = options;
  const configPath = resolve(process.cwd(), config);
  const configDir = dirname(configPath);
  const customConfig: CustomConfig = await import(configPath);
  customConfig.configDir = configDir;
  buildWebpack(customConfig, lib);
};

export default build;
