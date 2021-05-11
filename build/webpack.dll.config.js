const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, 'static/js'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}