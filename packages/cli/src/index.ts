#! /usr/bin/env node
import { program } from 'commander';
import pkg from '../package.json';

program
  .version(pkg.version)
  .command('serve <name>')
  .option('-c --config [path]', 'config file path', './avsb.config.js')
  .action((a, b) => {
    console.log('remove ' + a, b);
  });

program.parse(process.argv);
