import { resolve, dirname } from 'path';
import fs from 'fs';
import { promisify } from 'util';
import Koa from 'koa';
import serve from 'koa-static';
import { createProxyMiddleware } from 'koa-http-proxy-server';
import open from 'open';
import chalk from 'chalk';
import { CustomConfig } from '@avsb/utils';

interface PreviewOptions {
  config: string;
}

const readFile = promisify(fs.readFile);

const createProxies = (app: Koa, proxy: Record<string, Record<string, string>>) => {
  Object.entries(proxy).forEach(([k, v]) => {
    app.use(createProxyMiddleware(k, v));
  });
};

const startServer = (options: CustomConfig) => {
  const randomPort = Math.round(Math.random() * 10000 + 10000);
  const {
    configDir,
    devServer: { proxy = {} },
    preview: { port = randomPort } = {},
    path: { distPath = './dist' } = {},
  } = options;

  const app = new Koa();

  createProxies(app, proxy);

  app.use(serve(resolve(configDir, distPath)));

  app.use(async ctx => {
    const indexHtml = await readFile(`${resolve(configDir, distPath)}/index.html`);
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = indexHtml.toString();
  });

  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.green(`preview server started on ${url}`));
    open(url);
  });
};

const preview = async (options: PreviewOptions) => {
  const { config } = options;
  const configPath = resolve(process.cwd(), config);
  const configDir = dirname(configPath);
  const customConfig = await import(configPath);
  customConfig.configDir = configDir;

  startServer(customConfig);
};

export default preview;
