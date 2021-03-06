const webpack = require('webpack');

module.exports = {
    entry:'./src/index.js',
    module:{
      rules:[
        {
          test:/\.(js|jsx)$/,
          exclude:/node_modules/,
          use:['babel-loader']       
        },
        {
          test: /\.css$/, use: ['style-loader','css-loader']
        }
      ]
    },
    resolve:{
      extensions:['*', '.js', '.jsx', '.css']
    },
    output:{
      path:__dirname + '/dist',
      publicPath:'/',
      filename:'main.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
      contentBase:'./dist',
      port: 3000,
      publicPath: '/',
      historyApiFallback: true,
      hot:true    
    }
};