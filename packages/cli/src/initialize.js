"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = __importDefault(require("@avsb/serve"));
const build_1 = __importDefault(require("@avsb/build"));
const package_json_1 = __importDefault(require("../package.json"));
const initialize = () => {
    commander_1.program.name(Object.keys(package_json_1.default.bin)[0]).usage('<command> [options]').version(package_json_1.default.version).option('-d, --debug', '开启调试模式', false);
    commander_1.program
        .command('serve')
        .option('-e, --engine <engine>', '编译器webpack|vite', 'webpack')
        .option('-c, --config <filePath>', '配置文件路径', './avsb.config.js')
        .action(options => {
        (0, serve_1.default)(options);
    });
    commander_1.program.command('build').option('-c, --config <filePath>', '配置文件路径', './avsb.config.js').action(build_1.default);
    commander_1.program.parse(process.argv);
    if (commander_1.program.args.length < 1) {
        commander_1.program.outputHelp();
    }
};
exports.default = initialize;
