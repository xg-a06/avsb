// import { join } from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import vitePluginImp from 'vite-plugin-imp';
// import viteCssModule from 'vite-plugin-style-modules';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import { resolve } from '../helper';
// import { CustomConfig } from './typings';

// const generateViteConfig = (options: CustomConfig) => {
//   const { configDir, workspace = './', rootDir = './src', entry, devServer, variables, path: { tplPath = './index.html', distPath = './dist', assetPath = 'static' } = {} } = options;
//   console.log(process.cwd());

//   const baseConfig = {
//     plugins: [
//       react(),
//       vitePluginImp({
//         libList: [
//           {
//             libName: 'antd',
//             style(name) {
//               return `${resolve(workspace, configDir)}/node_modules/antd/es/${name}/style/css.js`;
//             },
//           },
//         ],
//       }),
//       (viteCssModule as any)({
//         path: /^(?!.*\.global).*\.less$/,
//       }),
//       createHtmlPlugin({ verbose: true, entry: resolve(entry, configDir) }),
//     ],
//     css: {
//       devSourcemap: true,
//     },
//     build: {
//       sourcemap: true,
//     },
//     resolve: {
//       extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
//       alias: {
//         '@': resolve(`${join(workspace, rootDir)}`, configDir),
//       },
//     },
//     define: {
//       'process.env': {
//         ...variables,
//       },
//     },
//     server: {
//       host: '0.0.0.0',
//       open: true,
//       https: false,
//       ssr: false,
//       base: '/build/',
//       outDir: 'dist',
//       ...devServer,
//     },
//   };
//   return defineConfig(baseConfig);
// };

// export default generateViteConfig;
