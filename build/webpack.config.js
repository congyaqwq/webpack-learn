const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 每次删除以前的配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require('vue-loader')

const devMode = process.argv.indexOf('--mode=production') === -1


module.exports = {
  mode: 'development',
  entry: {
    main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
    header: path.resolve(__dirname, '../src/header.js'),
  },
  output: {
    filename: '[name].[hash:8].js', // 打包后的名称
    path: path.resolve(__dirname, '../dist') // 打包后的目录
  },
  devServer: {
    port: 3000,
    hot: true,
    contentBase: '../dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ["*", '.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: ['vue-loader']
      },
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,// 为数组，从右向左解析
          options: {
            pubilcPath: '../dist/css/',
            hmr: devMode
          }
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            pubilcPath: '../dist/css/',
            hmr: devMode
          }
        }, 'css-loader',
          'postcss-loader',
          'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif$)/i, // 图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  }
}

// 引入的第二种方法
// {
  // loader: 'postcss-loader',
  // options: {
  //   plugins: [require('autoprefixer')] // autoprefix 兼容浏览器的css --webkit
  // }
// }