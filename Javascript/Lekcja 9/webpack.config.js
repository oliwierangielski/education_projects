const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/script.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, './'),
    port: 8080,
    watchFiles: [
      path.resolve(__dirname, './src/script.ts')
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  watch: true
}