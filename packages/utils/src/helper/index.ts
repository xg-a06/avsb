import { resolve as pathResolve, join } from 'path';
import { loader } from 'mini-css-extract-plugin';

const resolve = (dir: string, configDir: string) => pathResolve(configDir, dir);

const subDir = (dir: string, dir1: string) => join(dir1, dir);

const getCssLoaders = (workspace: string, rootDir: string, configDir: string) => {
  const env = process.env.NODE_ENV;
  const isProd = env === 'production';
  const sourceMap = !isProd;
  const lastLoader = !isProd ? 'style-loader' : loader;
  const cssInclude = [/src/];
  const loaders = [
    {
      test: /\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
        },
      ],
      include: resolve(join(workspace, 'node_modules'), configDir),
    },
    {
      test: /\.global\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
      ],
    },
    {
      test: /^(?!.*\.global).*\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
          options: {
            modules: { localIdentName: '[hash:base64:6]' },
            sourceMap,
            importLoaders: 1,
          },
        },
        { loader: 'postcss-loader', options: { sourceMap } },
      ],
      include: cssInclude,
    },
    {
      test: /\.global\.less$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
          options: { sourceMap, importLoaders: 2 },
        },
        { loader: 'postcss-loader', options: { sourceMap } },
        { loader: 'less-loader', options: { sourceMap } },
      ],
      include: resolve(join(workspace, rootDir), configDir),
    },
    {
      test: /^(?!.*\.global).*\.less$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader',
          options: {
            modules: { localIdentName: '[hash:base64:6]' },
            sourceMap,
            importLoaders: 2,
          },
        },
        { loader: 'postcss-loader', options: { sourceMap } },
        { loader: 'less-loader', options: { sourceMap } },
      ],
      include: cssInclude,
    },
  ];
  return loaders;
};

export { resolve, subDir, getCssLoaders };
