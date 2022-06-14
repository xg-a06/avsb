interface BuildOptions {
  config: string;
}

const build = (options: BuildOptions) => {
  console.log(options);
};

export default build;
