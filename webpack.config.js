const path = require("path");

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.rs$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
            }
          },
          {
            loader: 'rust-native-wasm-loader',
            options: {
              release: true,
              wasmBindgen: {
                wasm2es6js: true,
              },
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  mode: "development"
};
