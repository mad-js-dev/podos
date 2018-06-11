/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */
const path = require("path"), 
MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { } },
          'postcss-loader',
        ],
      },
      {
        test: /\.sass$|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {  },
          },
          { loader: 'sass-loader' },
        ],
      }
    ]
  },
  plugins: [
      new MiniCssExtractPlugin()
  ]
};