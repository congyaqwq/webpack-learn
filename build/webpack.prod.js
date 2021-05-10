const path = require('path')
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')
const CopyWebpacckPlugin = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('uglifyjs-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    hot: true,
    contentBase: '../dist'
  },
  plugins: [
    new CopyWebpacckPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist'),
    }])
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunl-libs',
          test: /[\\/]node_modules[\\/]]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  }
})