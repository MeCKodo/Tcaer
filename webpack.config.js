const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');//引入

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    // publicPath: '/static/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js', // '[name].[chunkhash].js'
    chunkFilename: '[id].js',
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "../src"),
    ],
    extensions: ['.js', '.vue', '.json', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        use: ['babel-loader'],
        include: path.join(__dirname , 'src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [// 对应的插件
    // new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
  ],
};
