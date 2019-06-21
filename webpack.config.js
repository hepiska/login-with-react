const HtmlWebpackPlug = require('html-webpack-plugin')
const path = require('path')

const HtmlPlug = new HtmlWebpackPlug({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // 'babel-polyfill',
    // 'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }

    ]
  },
  plugins: [
    HtmlPlug
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  }

}
