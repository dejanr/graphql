module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: './',
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/],
      },
      {
        test: /\.json/,
        loader: 'json',
      },
    ],
  },
};
