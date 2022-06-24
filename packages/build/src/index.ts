import { resolve, dirname } from 'path';
import { generateBuildConfig, Webpack, Configuration, chalk } from '@avsb/utils';

interface BuildOptions {
  config: string;
}

const build = async (options: BuildOptions) => {
  const { config } = options;
  const configPath = resolve(process.cwd(), config);
  const configDir = dirname(configPath);
  const customConfig = await import(configPath);
  customConfig.configDir = configDir;

  const webpackConfig = generateBuildConfig(customConfig);
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

export default build;
