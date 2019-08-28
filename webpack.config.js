const HtmlWebpackPlug = require('html-webpack-plugin')
const path = require('path')

const HtmlPlug = new HtmlWebpackPlug({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  entry: [
    'react-hot-loader/babel',
    // 'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'eval',
  devServer: {
    watchContentBase: true,
    historyApiFallback: true,
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
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  //   modules: true,
                  //   importLoaders: 1,
                  //   localIdentName: '[name]_[local]_[hash:8]',
                },
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  //   modules: true,
                  //   localIdentName: '[name]_[local]_[hash:8]',
                },
              },
              //   'postcss-loader',
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            // test: /\.(ttf|otf|eot|woff(2)?)?$/,
            test: [/\.ttf$/, /\.otf$/, /\.woff$/, /\.eot$/],
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[ext]',
                },
              },
            ]
          },
          {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {
              name: 'static/media/image/svg/[name].[ext]',
            },
          },
          {
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[ext]',
            },
          },
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
