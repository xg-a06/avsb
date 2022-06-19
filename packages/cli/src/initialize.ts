import { program } from 'commander';
import serve from '@avsb/serve';
import build from '@avsb/build';
import pkg from '../package.json';

const initialize = () => {
  program.name(Object.keys(pkg.bin)[0]).usage('<command> [options]').version(pkg.version).option('-d, --debug', '开启调试模式', false);

  program.command('serve').option('-e, --engine <engine>', '编译器webpack|vite', 'webpack').option('-c, --config <filePath>', '配置文件路径', './avsb.config.js').action(serve);

  program.command('build').option('-c, --config <filePath>', '配置文件路径', './avsb.config.js').action(build);

  program.parse(process.argv);

  if (program.args.length < 1) {
    program.outputHelp();
  }
};

export default initialize;
