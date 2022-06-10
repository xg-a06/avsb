interface ServeOptions {
  config: string;
}

const serve = (options: ServeOptions) => {
  console.log(options);
};

export default serve;
