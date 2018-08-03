const path = require('path');
const Webpack = require('webpack');

module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
  ],
};
