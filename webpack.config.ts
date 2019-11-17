import * as path from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
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
  plugins: [new CleanWebpackPlugin()],
};

export default config;
