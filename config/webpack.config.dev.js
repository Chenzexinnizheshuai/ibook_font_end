const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development',//此配置可以保证用webpack打包后的文件不是压缩版本的
    entry: {
        main: ['./src/javascript/app.js'],
        login: ['./src/javascript/login.js']
    },
    output: {
        path: path.resolve(__dirname,'../dev'),
        filename: '[name].js',
    
    },
    devServer: {
        //以下两项配置可以让我们能够在浏览器路径上直接访问以下文件夹我们的文件
        contentBase: [path.join(__dirname, "../dev"),path.join(__dirname, "../src/assets")],
        compress: true,
        port: 8081,
        proxy:{
            '/api':{
                target: 'http://localhost:3000',
                changeOrigin:true
            }
        }
    },
    plugins: [
        //如果是多页面操作就new多个实例就可以了
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template:'./src/login.html',
            filename:'login.html',
            chunks: ['login']
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to:  path.resolve(__dirname, '../dev/static')
        }])
       
    ],
    module: {
        rules: [
            {
                test:/\.(css|scss)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },                    
                    { loader: 'sass-loader' } 
                ]
            },
            {
                test:/\.html$/,
                use: [
                    {
                        loader: 'string-loader'
                    }
                ]
            },
            {
                //提及小的图片logo什么的转换成base64模式，在js中用模块化引入，大的图片用正常的在img标签中输入路径
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 88888888
                      //当小于这个数时将会转换成base64模式
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            }
        ]
    }
    
}