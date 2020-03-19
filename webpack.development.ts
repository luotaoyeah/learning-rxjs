import * as webpack from 'webpack';
// @ts-ignore
import webpackMerge = require('webpack-merge');
import commonConfig from './webpack.config';

const config: webpack.Configuration = webpackMerge.merge(commonConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
});

export default config;
