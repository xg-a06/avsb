interface CustomConfig {
  configDir: string;
  analysis?: boolean;
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
