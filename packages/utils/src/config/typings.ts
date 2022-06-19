interface CustomConfig {
  configDir: string;
  workspace?: string;
  rootDir?: string;
  entry: string;
  devServer: any;
  alias?: {
    [key: string]: string;
  };
  path: {
    distPath?: string;
    tplPath?: string;
    publicPath?: string;
    assetPath?: string;
  };
  variables: {
    [key: string]: Array<string>;
  };
}

export { CustomConfig };
