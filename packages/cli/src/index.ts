#!/usr/bin/env node
import { program } from 'commander';
import pkg from '../package.json';

console.log(123, pkg.version);
