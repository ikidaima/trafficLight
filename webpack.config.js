const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const CssMinimizerPlugin = require(`css-minimizer-webpack-plugin`);
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = process.env.NODE_ENV === `development`;
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: `./index.html`,
    minify: {
      collapseWhitespace: isProd
    }
  }),
  new MiniCssExtractPlugin({
    filename: `./css/${filename('css')}`,
  }),
  new VueLoaderPlugin()
];

module.exports = {
  context: path.resolve(__dirname, `src`),
  mode: `development`,
  entry: `./index.js`,
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, `dist`),
    publicPath: ``,
  },
  devtool: isDev ? `source-map` : false,
  devServer: {
    contentBase: path.resolve(__dirname, `dist`),
    open: true,
    hot: true,
    port: 8081,
    historyApiFallback: true
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [`babel-loader`]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
          },
          `css-loader`,
          `postcss-loader`
        ]
      },
      {
        test: /\.html$/i,
        use: [`html-loader`]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: `file-loader`,
            options: {
              outputPath: `img`
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}