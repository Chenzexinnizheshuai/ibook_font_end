我们将配置文件放入到config文件夹中易于管理，但是在终端运行config时会在根目录中找不到配置文件（webpack.config.js）所以在中端不能只输入webpack而是要添加命令 
webpack --config ./config/webpack.config.dev.js
但是这样会导致每次打包都非常麻烦  因此我们可以在package.json中配置命令