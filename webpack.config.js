const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { 
            presets: [
                'babel-preset-es2016'
            ]
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    host: '0.0.0.0',
    publicPath: 'http://localhost:3000/dist/',
    historyApiFallback: true,
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
