declare namespace NodeJS {
  export interface ProcessEnv {
    SUB_DIR: string;
  }
}

declare module 'webpack-merge' {
  export const merge: () => any;
}
