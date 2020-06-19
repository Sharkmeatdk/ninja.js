const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['./src/app.tsx'],
    plugins: [

        /*
        new CleanWebpackPlugin(['dist']),
        */

        new HtmlWebpackPlugin({

            // Required
          inject: false,
          template: require('html-webpack-template'),
    
          // Optional
          minify: {
            collapseWhitespace: true,
            preserveLineBreaks: false,
          },

          bodyHtmlSnippet: '<div id="root"></div>',

          /*
          appMountId: 'app',
          appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
          headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
          bodyHtmlSnippet: '<custom-element></custom-element>',
            */

        /*
          baseHref: 'http://example.com/awesome',
        */
          
            /*
          devServer: 'http://localhost:3001',
        */

          /*
          googleAnalytics: {
            trackingId: 'UA-XXXX-XX',
            pageViewOnLoad: true
          },
          */

          meta: [
            {
              name: 'description',
              content: 'A better default template for html-webpack-plugin.'
            }
          ],
          
          // responsive headers
          mobile: true,

          // page language
          lang: 'en-US',

          links: [
            'main.css'
            /*
            'https://fonts.googleapis.com/css?family=Roboto',
            {
              href: '/apple-touch-icon.png',
              rel: 'apple-touch-icon',
              sizes: '180x180'
            },
            {
              href: '/favicon-32x32.png',
              rel: 'icon',
              sizes: '32x32',
              type: 'image/png'
            }
            */
          ],
          inlineManifestWebpackName: 'webpackManifest',

          /*
          scripts: [
            'http://example.com/somescript.js',
            {
              src: '/myModule.js',
              type: 'module'
            }
          ],
          */

          /*
          window: {
            env: {
              apiHost: 'http://myapi.com/api/v1'
            }
          }
          */

          // page title
          title: 'ListReaderApp - the Yohanz edition'

        })
      ],
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss', '.json']
    },    
    module: {
        rules: [
            { 
              test: /\.tsx$/, 
              loader: "ts-loader" },
            {
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'main.css',
                      outputPath: './'
                    }
                  },
                  {
                    loader: 'extract-loader'
                  },
                  {
                    loader: 'css-loader', options: { minimize: true }
                  },
                  {
                    loader: 'postcss-loader'
                  },
                  {
                    loader: 'sass-loader'
                  }
                ]
              },
              {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]',
                      outputPath: './'
                    }   
                  }
                ]
              }
        ]
    }    
};
