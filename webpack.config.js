/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */
var path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    devMode = process.env.NODE_ENV !== 'production'

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
    entry: {
        main: "./src/js/main.js",
        common: path.resolve(__dirname, 'src/sass/common.scss'),
        framework: path.resolve(__dirname, 'src/sass/framework.scss/'),
        utils: path.resolve(__dirname, 'src/sass/utils.scss/')
    },
    /*output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist"
    },*/
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
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img/',
                        publicPath: '../img/',
                        name: '[name].[ext]',
                    },

                },
                exclude: [
                    path.resolve(__dirname, "src/statics/fonts/")
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        publicPath: '../fonts/',
                        name: '[name].[ext]',
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
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
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                 Styles: {
                  name: 'common',
                  test: (m,c,entry = 'common') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                  chunks: 'all',
                  enforce: true
                },
                frameworkStyles: {
                  name: 'framework',
                  test: (m,c,entry = 'framework') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                  chunks: 'all',
                  enforce: true
                },
                utilsStyles: {
                  name: 'utils',
                  test: (m,c,entry = 'utils') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                  chunks: 'all',
                  enforce: true
                }
            }
        }
    },
};