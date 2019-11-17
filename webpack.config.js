const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve('dist/'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    target: 'node',
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [new CleanWebpackPlugin()],
  },
];
