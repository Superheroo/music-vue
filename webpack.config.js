/**
 * Created by 蓝景技术 on 2017/7/12.
 * webpack配置文件
 */
/***可根据项目特殊需求，修改以下变量****/


var COMMON_LIB = ["babel-polyfill", "./src/static/lib/preloadjs-0.6.2.min.js","jquery","vue"],
	PRO_PUBLICPATH = "/",//生产模式下的output.publicPath,根据线上项目具体存放目录来决定，默认是根目录"/"
	DEV_PUBLICPATH = "/",//开发模式下的output.publicPath
	SERVER_PORT = Math.floor(Math.random()*4000+8000);
	
	
	
/******/



var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html页面插件，自动引入相关的js文件，css文件
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //用于抽离样式文件
var CopyWebpackPlugin = require("copy-webpack-plugin"); //拷贝文件
var path = require('path');
var merge = require('webpack-merge'); //配置合并插件
var tinyPngWebpackPlugin = require('tinypng-webpack-plugin'); //tinypng压缩插件


//基础配置
var baseConfig = {
	entry: {
		//入口文件，通常一个html一个入口
		main: ["./src/js/main.js"], //入口1
		// second:path.join(__dirname,'src','js','second.js'),//入口2（做多页应用才需要）
		
		//html里要引入的公共文件库
		lib:COMMON_LIB
	},
	module: {
		loaders: [
			{//json文件处理
				test: /\.json$/,
				loader: "json-loader",
				include: /src/
			},
			{//css文件处理，并打包为独立一个css文件
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!postcss-loader"
				})
			},
			{//scss文件处理
				test: /\.scss$/,
				include: /src/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!postcss-loader!sass-loader"
				})
			},
			{//js文件处理
				test: /\.js$/,
				loader: "babel-loader",
				include: /src/ //接收数组参数，元素为路径字符串
                // ,query: { //必须新建一个.babelrc文件否则vue中es6语法报错
				// 	presets: ['es2015'] //按照最新的ES6语法规则去转换
				// }
			},
			{//字体类型处理
				test: /\.(woff(2)?|eot|ttf|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 1,
					name: 'static/font/[name].[ext]'
				}
			},
			{//正则匹配后缀.png、.jpg、.gif图片文件;
				test: /\.(png|jpe?g|gif)$/i,
				include: /src/,
				use: [{
					//加载url-loader 同时安装 file-loader;
					loader: 'url-loader',
					options: {
						limit: 100,//小于10000K的图片文件转base64到css里,当然css文件体积更大;
						name: 'images/[name].[ext]'//设置最终生成路径
					}
				}]
			},
			{//vue文件处理
				test: /\.vue$/,
				loader: "vue-loader",
				include: /src/,
				options: {
					extractCSS: true		//单独把vue文件中的样式抽离出来
				}
			},
			// {//HTML文件处理
			// 	test: /\.html$/,
			// 	include: /src/,
			// 	loader: "html-loader",
			// }
		]
	},
	plugins: [
		//抽离生成公共文件
		new webpack.optimize.CommonsChunkPlugin({
			name: "lib",
			minChunks: 2 //表示至少要被引用的次数才会被抽离为公共文件，infinite这样就只会打包entry中的jquery
		}),
		//抽离成独立的css文件
		new ExtractTextPlugin({
			filename: "css/[name].css",
			disable: false,
			allChunks: true
		}),
		//拷贝文件
		new CopyWebpackPlugin(
			[
				{
					from: __dirname + '/src/static',
					to: __dirname + '/dist/static'
				}
				,
				{
					from: __dirname + '/src/images',
					to: __dirname + '/dist/images'
				}
			]),
		//自动注入相关文件到
		new HtmlWebpackPlugin({
			filename: "index.html", //目录相对于output.path
			title: '[name]',
			inject: true,
			// chunks: ["index", "lib"],		//指定注入的入口文件（多页应用用到）
			template: "./src/index.html",
			minify: { //压缩HTML文件
				 removeComments: true, //移除HTML中的注释
				 collapseWhitespace: true, //删除空白符与换行符
				 removeAttributeQuotes: true //删除标签属性值的引号
			}
		}),
	],
	resolve: {
		//引入文件，可忽略后缀名
		extensions: [".js", ".css", ".scss",".vue"],
		//引入模块的别名
		alias: {
			"vue": "vue/dist/vue.js"
		}
	}
}
//开发模式配置
var devConfig = merge(baseConfig, {
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "src"),//这里是相对于publicPaht的，并且“生成”文件也是受output的filename路径的影响
		stats: "errors-only",		//设置报错的等级
		port: SERVER_PORT,					//开启服务的端口
		inline:true,
		hot: true, 
		watchContentBase: true 		//任意文件改动，都会自动刷新页面
	},
	output: {
		filename: 'js/[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: DEV_PUBLICPATH //这里的设置其实是要结合服务器设置的，这里的/表示服务器地址的根，比如www.shuai.com/
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
	],
})

//生产模式配置
var proConfig = merge(baseConfig, {
	output: {
		filename: 'js/[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: PRO_PUBLICPATH //这里的设置其实是要结合服务器设置的，这里的/表示服务器地址的根，比如www.shuai.com/
	},
	devtool: "cheap-module-source-map",
	plugins: [
		//压缩图片
		new tinyPngWebpackPlugin({
			key:[
				"5ei-psE-rjjT6Npw9L7GicY22Q3n7Fvr",
				"kUng7l6l-6afX40qXH1RpukdHSwgLP02",
				"aQ3TnjXTKXb9TMIt994Q80ZTjvIzxmic",
				"NrdB1WWcD70sdBXwtlQ6-4f_76htsOy5"
			],
			relativePath: ['./']
		})
	]
})

/*****根据命令名称，区分开发和生产环境******/
/*****通过命令名称，以指定模式运行******/
if(process.env['npm_lifecycle_event'].trim() === 'dev') {
	console.log("*********梁颖聪**********");
	console.log("********来瓶红牛，决战到天亮***********");
	console.log("*********吃了夜宵你好意思不通宵？**********");
	console.log("*********运营的走开，不要跟我说需求**********");
	module.exports = devConfig;
} else {
	console.log("*********梁颖聪**********");
	console.log("********来瓶红牛，决战到天亮***********");
	console.log("*********吃了夜宵你好意思不通宵？**********");
	console.log("*********运营的走开，不要跟我说需求**********");
	module.exports = proConfig;
}