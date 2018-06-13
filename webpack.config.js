/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */
const path = require("path"),
HtmlWebpackPlugin = require('html-webpack-plugin'),
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
        },
        {
            test: /\.hbs|handlebars$/,
            loader: "handlebars-loader",
            query: {
                partialDirs: [
                    path.join(__dirname, 'src', 'views'),
                    path.join(__dirname, 'src', 'components'),
                    path.join(__dirname, 'src', 'components', 'generic'),
                    path.join(__dirname, 'src', 'components', '01_atoms'),
                    path.join(__dirname, 'src', 'components', '02_molecules'),
                    path.join(__dirname, 'src', 'components', '03_organisms'),
                    path.join(__dirname, 'src', 'components', '04_templates')
                ],
                helperDirs: [
                    path.join(__dirname, 'src', 'helpers')
                ]
            }
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        title: 'Landing page1',
        data: require('./src/views/home/locales.default.json'),
        filename: 'home.html',
        hash: true,
        partialDirs: './src/components/',
        template: './src/views/home/index.hbs',
        //inlineSource: '.(js|css)$' // embed all javascript and css inline
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};