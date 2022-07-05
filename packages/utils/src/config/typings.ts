interface CustomConfig {
  configDir: string;
  analysis?: boolean;
  workspace?: string;
  rootDir?: string;
  entry: string | Record<string, string>;
  devServer: any;
  preview: {
    port: number;
  };
  alias?: {
    [key: string]: string;
  };
  path: {
    distPath?: string;
    tplPath?: string | Array<object>;
    publicPath?: string;
    assetPath?: string;
  };
  variables: {
    [key: string]: Array<string>;
  };
  custom?: Record<string, any>;
  override?: (options: any) => any;
}

export { CustomConfig };
