/**
 * hk的文件
 *
 * 不许抄袭
 *
 * long description for the file
 *
 * @summary short description for the file
 * @author hk
 *
 * Created at     : 2019-04-17 16:07:50
 * Last modified  : 2019-04-17 16:19:52
 */

var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
// webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        // 'list'              : ['./src/page/list/index.js'],
        // 'detail'            : ['./src/page/detail/index.js'],
        // 'cart'              : ['./src/page/cart/index.js'],
        // 'order-confirm'     : ['./src/page/order-confirm/index.js'],
        // 'order-list'        : ['./src/page/order-list/index.js'],
        // 'order-detail'      : ['./src/page/order-detail/index.js'],
        // 'payment'           : ['./src/page/payment/index.js'],
        // 'user-login'        : ['./src/page/user-login/index.js'],
        // 'user-register'     : ['./src/page/user-register/index.js'],
        // 'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        // 'user-center'       : ['./src/page/user-center/index.js'],
        // 'user-center-update': ['./src/page/user-center-update/index.js'],
        // 'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        // 'result'            : ['./src/page/result/index.js'],
        // 'about'             : ['./src/page/about/index.js'],
    },
    output: {
        path        : __dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename    : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('list'))
    ],
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    }

};


module.exports = config;